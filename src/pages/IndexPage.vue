<template>
  <q-page class="">
    <q-card width="100%" style="margin: 20px; padding: 10px">
      <q-input
        v-model="currentComment.content"
        type="textarea"
        input-style="height: 200px"
        label="评论"
      ></q-input>
      <q-radio v-model="currentComment.type" :val="0" label="推荐"></q-radio>
      <q-radio v-model="currentComment.type" :val="1" label="一般"></q-radio>
      <q-radio v-model="currentComment.type" :val="2" label="不推荐"></q-radio>
      <q-separator />
      <q-card-actions>
        <div style="text-align: right; width: 100%">
          <q-btn-group>
            <q-btn
              color="red"
              label="清除"
              padding="30px"
              @click="clearCurrentComment"
            />
            <q-btn
              color="primary"
              style="width: 200px"
              padding="30px"
              @click="addComment(currentComment)"
              >添加</q-btn
            >
          </q-btn-group>
        </div>
      </q-card-actions>
    </q-card>

    <div style="margin: 20px">
      <q-btn-group spread>
        <q-btn size="lg" color="green-5">导出</q-btn>
      </q-btn-group>
    </div>

    <!-- Noted comments below. -->
    <q-card
      width="100%"
      style="margin: 20px; padding: 10px"
      v-for="comment in comments"
      :key="comment._id"
    >
      <q-card-section header>
        <div style="display: inline-block; width: 10%"># {{ comment._id }}</div>
        <div style="display: inline-block; width: 40%; float: right">
          <q-btn
            dense
            flat
            color="red"
            @click="removeComment(comment._id ? comment._id : -1)"
            >删除</q-btn
          >
          <div style="width: 20px; display: inline-block">&nbsp;</div>
          <q-btn dense flat color="primary">修改</q-btn>
        </div>
      </q-card-section>
      <q-separator />
      <q-item>
        <q-item-section side> 类型： </q-item-section>
        <q-item-section>
          {{
            comment.type == CommentTypeEnum.Positive
              ? '推荐'
              : comment.type == CommentTypeEnum.Neutral
              ? '一般'
              : '不推荐'
          }}
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section side> 文本： </q-item-section>
        <q-item-section
          style="
            overflow-wrap: break-word;
            overflow: hidden;
            text-overflow: ellipsis;
            /* justify-content: normal; */
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
            display: -webkit-box;
          "
        >
          {{ comment.content }}
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section side> 关键词： </q-item-section>
        <q-item-section>
          {{ comment.keywords?.length ? '' : '关键词处理中...' }}
          <q-chip
            removable
            color="primary"
            outline
            v-for="kw in comment.keywords"
            :key="kw"
            >{{ kw }}</q-chip
          >
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section side> 摘要： </q-item-section>
        <q-item-section
          style="
            overflow-x: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          "
        >
          {{ comment.abstract ? comment.abstract : '摘要处理中...' }}
        </q-item-section>
      </q-item>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { Comment, CommentTypeEnum } from 'src/components/models';
import { CommentService } from 'src/service/comment_service';
import { OpenAI } from 'openai';

defineOptions({
  name: 'IndexPage',
});

const currentComment: Ref<Comment> = ref({
  content: '',
  type: CommentTypeEnum.Positive, // 0 for positive, 1 for neutral, 2 for negative
});

const comments: Ref<Array<Comment>> = ref([]);

const service = new CommentService();

const fetchNoCors = async (
  url: string | URL | globalThis.Request,
  options?: RequestInit
) => {
  if (options) options.mode = 'no-cors';
  const response = await fetch(url, options);
  return response;
};
const openai = new OpenAI({
  apiKey: '',
  dangerouslyAllowBrowser: true,
  fetch: fetchNoCors,
});

openai.chat.completions.create({
  model: 'chatgpt-4o-latest',
  messages: [{ role: 'user', content: 'Say hello world!' }],
});

// Logic codes below
const clearCurrentComment = () => {
  currentComment.value.content = '';
};

const getComments = () => {
  service.getComments().then((v) => {
    console.log('select:', v);
    comments.value = v;
  });
};
getComments(); // init page, load data

const addComment = async (c: Comment) => {
  if (c.content.length <= 10) {
    window.alert('非有效评论');
    return;
  }
  const cs = JSON.stringify(c);
  await service.addComment(JSON.parse(cs)); // Insert into db
  // TODO: Call OpenAI API asynchronously for keywords and abstract

  // Renew list
  getComments();
};

const removeComment = async (id: number) => {
  service.removeComment(id).then(() => {
    getComments();
  });
};
</script>
