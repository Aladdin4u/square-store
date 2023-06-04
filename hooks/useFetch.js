import { useState } from "react";
import axios from "axios";

export default function useFetch() {
  const [loading, setLoading] = useState(false);

  function get(url) {
    return new Promise(async(resolve, reject) => {
      try {
        setLoading(true);
        const data = await axios.get(url, {});
        if (!data) {
          setLoading(false);
          return reject(data);
        }
        setLoading(false);
        resolve(data);
      } catch (error) {
        setLoading(false);
        reject(error);
      }
    });
  }

  function post(url, body) {
    return new Promise(async(resolve, reject) => {
      try {
        setLoading(true);
        const data = await axios.get(url, { body }, {});
        if (!data) {
          setLoading(false);
          return reject(data);
        }
        setLoading(false);
        resolve(data);
      } catch (error) {
        setLoading(false);
        reject(error);
      }
    });
  }

  return { get, post, loading };
}
