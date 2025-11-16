import * as Linking from "expo-linking";
import { useEffect } from "react";

export const useHandleDeepLink = () => {
  useEffect(() => {
    const sub = Linking.addEventListener("url", (event) => {
      const { url } = event;
      const data = Linking.parse(url);

      if (data?.queryParams?.token) {
        const token = data.queryParams.token;

        console.log(token);
      }
    });

    return () => sub.remove();
  }, []);
};
