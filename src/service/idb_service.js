import { connection } from './jsstore_con';
import { DATA_TYPE } from 'jsstore';

const getDatabase = () => {
  const tblComment = {
    name: 'Comments',
    columns: {
      _id: {
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        notNull: true,
        dataType: DATA_TYPE.Number,
      },
      content: {
        dataType: DATA_TYPE.String,
      },
      keywords: {
        dataType: DATA_TYPE.Array,
      },
      abstract: {
        dataType: DATA_TYPE.String,
      },
    },
  };
  const dataBase = {
    name: 'Comment_Notes',
    tables: [tblComment],
  };
  return dataBase;
};

export const initJsStore = async () => {
  const dataBase = getDatabase();
  return await connection.initDb(dataBase);
};
