import { useAuthStore } from "../stores/useAuthStore";
import { useChatStore } from "../stores/useChatStore";

const ChatHeader = () => {
	const {selectedUser, setSelectedUser} = useChatStore();
	const {onlineUsers} = useAuthStore();

	return (
		<div className="p-2.5 border-b border-base-300">
			<flex className="items-center justify-between">
				<div className="flex items-center gap-3">
					{/* avatar */}
					<div className="avatar">
						<div className="size-10 rounded-full relative">
							
						</div>
					</div>
				</div>
			</flex>
		</div>
	);
}

export default ChatHeader;
