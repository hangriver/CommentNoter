import { connection } from './jsstore_con';
import { Comment } from 'src/components/models';

export class CommentService {
  tableName: string;

  constructor() {
    this.tableName = 'Comments';
  }

  getComments() {
    console.log('select');
    return connection.select<Comment>({
      from: this.tableName,
    });
  }

  addComment(com: Comment) {
    console.log(com);
    return connection.insert({
      into: this.tableName,
      values: [com],
      return: true,
    });
  }

  getCommentById(id: number) {
    return connection.select({
      from: this.tableName,
      where: {
        _id: id,
      },
    });
  }

  removeComment(id: number) {
    return connection.remove({
      from: this.tableName,
      where: {
        _id: id,
      },
    });
  }

  updateCommentById(com: Comment) {
    if (com._id) {
      return connection.update({
        in: this.tableName,
        set: {
          type: com.type,
          content: com.content,
          keywords: com.keywords,
          abstract: com.abstract,
        },
        where: {
          _id: com._id,
        },
      });
    } else {
      console.error('_id is required!');
    }
  }
}
