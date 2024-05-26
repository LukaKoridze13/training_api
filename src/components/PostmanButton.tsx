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
      data-postman-param="env%5BTraining%20API%20ENV%5D=W3sia2V5IjoiQkFTRV9VUkwiLCJ2YWx1ZSI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCIsInNlc3Npb25WYWx1ZSI6Imh0dHBzOi8vdHJhaW5pbmctYXBpLXRocmVlLnZlcmNlbC5hcHAvYXBpIiwic2Vzc2lvbkluZGV4IjowfSx7ImtleSI6IkFVVEhfVVJMIiwidmFsdWUiOiJ7e0JBU0VfVVJMfX0vbG9naW4iLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCIsInNlc3Npb25WYWx1ZSI6Int7QkFTRV9VUkx9fS9sb2dpbiIsInNlc3Npb25JbmRleCI6MX0seyJrZXkiOiJMQU5HVUFHRSIsInZhbHVlIjoia2EiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCIsInNlc3Npb25WYWx1ZSI6ImthIiwic2Vzc2lvbkluZGV4IjoyfV0="
    ></div>
  );
};

export default PostmanButton;
