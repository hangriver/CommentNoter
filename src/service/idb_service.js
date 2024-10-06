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
      gender: {
        dataType: DATA_TYPE.String,
        default: 'male',
      },
      country: {
        notNull: true,
        dataType: DATA_TYPE.String,
      },
      city: {
        dataType: DATA_TYPE.String,
        notNull: true,
      },
    },
  };
  const dataBase = {
    name: 'Vue_Demo',
    tables: [tblStudent],
  };
  return dataBase;
};

export const initJsStore = async () => {
  const dataBase = getDatabase();
  return await connection.initDb(dataBase);
};
