import { useChatStore } from "../stores/useChatStore";

const HomePage = () => {
	const {selectedUser} = useChatStore();

	return (
		<div>
			HomePage
		</div>
	);
}

export default HomePage;
