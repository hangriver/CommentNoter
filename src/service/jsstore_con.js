import { Connection } from 'jsstore';
import jsStoreWorker from 'jsstore/dist/jsstore.worker.min.js?worker';

//const getWorkerPath = () => {
//  // return dev build when env is development
//  if (process.env.NODE_ENV === 'development') {
//    return import('jsstore/dist/jsstore.worker.js?worker');
//  } else {
//    // return prod build when env is production
//    return import('jsstore/dist/jsstore.worker.min.js?worker');
//  }
//};

console.log(process.env.NODE_ENV);
//console.log(await getWorkerPath());
//const workerPath = await getWorkerPath().default;
//export const connection = new Connection(new Worker(workerPath));
export const connection = new Connection(new jsStoreWorker());

connection.logStatus = true;
