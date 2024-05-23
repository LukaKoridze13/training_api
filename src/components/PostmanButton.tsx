import React, { useEffect } from "react";

const PostmanButton = () => {
  useEffect(() => {
    // @ts-ignore
    (function (p, o, s, t, m, a, n) {
      // @ts-ignore
      if (!p[s]) {
        // @ts-ignore
        p[s] = function () {
          // @ts-ignore
          (p[t] || (p[t] = [])).push(arguments);
        };
      }
      if (!o.getElementById(s + t)) {
        const scriptElement = o.createElement("script");
        scriptElement.id = s + t;
        // @ts-ignore
        scriptElement.async = 1;
        scriptElement.src = m;
        o.getElementsByTagName("head")[0].appendChild(scriptElement);
      }
    })(window, document, "_pm", "PostmanRunObject", "https://run.pstmn.io/button.js");
  }, []);

  return (
    <div
      className="postman-run-button scale-[1.2]"
      data-postman-action="collection/fork"
      data-postman-visibility="public"
      data-postman-var-1="23546965-a2c8c7d6-46ef-44fa-b717-d376a6f033dd"
      data-postman-collection-url="entityId=23546965-a2c8c7d6-46ef-44fa-b717-d376a6f033dd&entityType=collection&workspaceId=9591de5b-77ae-40e2-84b5-6bbbdd2c877a"
    ></div>
  );
};

export default PostmanButton;
