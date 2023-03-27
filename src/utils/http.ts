import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: Object;
}
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  // axios 和 fetch的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();
  // utility type的用法：用泛型给它传入一个其它类型，然后utility type对这个类型进行某种操作
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

/*

// 联合类型
let a: string | number;
a = "one";

a = 1;
// a = {};

let b: string | number;

// 类型别名在很多情况下可以互换，这种情况下interface没办法替代
type b = string | number;

let myNumber: b = "6";

type Person = {
  name: string;
  age: number;
};
// 联合类型 Partial 取 Person类型中的部分属性，name，age，或者都没有这两个属性
const sola: Partial<Person> = {};
// 只想有其中的某一个或者某多个属性的Omit
const piggy: Omit<Person, "name" | "age"> = {};

type PersonKeys = keyof Person
type Age = Exclude<PersonKeys,'name'>
 */
