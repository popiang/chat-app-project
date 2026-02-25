import { useChatStore } from "../stores/useChatStore";
import { useAuthStore } from "../stores/useAuthStore";
import { useEffect } from "react";

const ChatContainer = () => {
	const {messages, getMessages, isMessageLoading} = useChatStore();
	const {selecterUser} = useAuthStore();

	useEffect(() => {
		getMessages(selecterUser._id);
	}, [getMessages, selecterUser])

	if (isMessageLoading) {
		return (
			<div className="flex-1 flex flex-col overflow-auto">
				<ChatHeader />
				<MessageSkeleton />
				<MessageInput />
			</div>
		);
	}

	return (
		<div>
			
		</div>
	);
}

export default ChatContainer;
