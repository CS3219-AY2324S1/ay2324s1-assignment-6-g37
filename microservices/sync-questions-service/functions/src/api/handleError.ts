import { Response } from "firebase-functions/v1";
import { CODE_INTERNAL_SERVER_ERROR } from "../utility";

/**
 * Handles errors from sending requests fetching responses.
 *
 * @param error Error thrown.
 * @param response Response to return.
 */
export function handleError(error: any, response: Response<any>) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log('-----Error ocurred in response-----')
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log('-----Error ocurred in request-----')
    //console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('-----Error ocurred in server-----')
    console.log('Error', error.message);
  }
  //console.log(error.config);
  response.sendStatus(CODE_INTERNAL_SERVER_ERROR);
}
