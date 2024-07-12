import { Bot, User } from "lucide-react";

const MessageBubble = (props) => {
  const isUser = props.user === "user";

  return (
    <div className={`flex items-start ${isUser ? "justify-end" : ""} gap-2.5`}>
      <div className="flex flex-col w-full max-w-[350px] sm:max-w-[500px] leading-1.5 p-4 border-gray-200 rounded-xl bg-gray-700">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-white mb-3">
            {isUser ? (
              <User className="h-6 w-6 text-white" />
            ) : (
              <Bot className="h-6 w-6 text-white" />
            )}
          </span>
        </div>
        <pre
          className="text-sm font-normal py-2.5text-white overflow-scroll"
          dangerouslySetInnerHTML={{ __html: props.message }}
        ></pre>
      </div>
    </div>
  );
};

export default MessageBubble;
