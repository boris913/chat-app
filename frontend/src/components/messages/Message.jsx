import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  
  // Couleurs de fond
  const bubbleBgColor = fromMe ? "bg-violet-700" : "bg-blue-500";
  const bubbleTextColor = "text-white";

  const shakeClass = message.shouldShake ? "animate-shake" : "";

  return (
    <div className={`chat ${chatClassName} mb-4`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Profile" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble p-3 rounded-lg shadow-md ${bubbleBgColor} ${bubbleTextColor} max-w-[70%] ${shakeClass}`}
      >
        <p className="text-sm">{message.message}</p>
        <div className="chat-footer flex justify-between opacity-60 text-xs mt-2">
          <div className="flex items-center">
            {!fromMe && message.isReceived && <span className="text-xs ml-1">✓</span>}
            {!fromMe && message.isRead && <span className="text-xs ml-1">✓✓</span>}
			<span className="text-xs ml-1">✓✓</span>
          </div>
          <span>{formattedTime}</span> {/* Date à droite */}
        </div>
      </div>
    </div>
  );
};

export default Message;