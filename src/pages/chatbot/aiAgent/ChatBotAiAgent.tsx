import { useSelector } from "react-redux";
import "../../../nodes/agentCustomNode.scss";
import { Layout } from "../../../components";
import VoiceAgentFlow from "../../../components/agentcreation/VoiceAgentFlow";
import { AppDispatch, RootState } from "../../../redux/store";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAgentList } from "../../../services/agentFlowServices";
import AgentLists from "../../../components/agentcreation/agentlists/AgentLists";
import { agentStore } from "../../../providers/AgentContext";
import { setBreadcrumbs } from "../../../redux/nodeSlice/breadcrumbSlice";
import { setInitialNodes } from "../../../redux/nodeSlice/nodeSlice";

function ChatBotAiAgent() {
  const { agentDetails, setAgentDetails, agentFlowtoggle } =
    useContext(agentStore);
  const { auth } = useSelector((state: RootState) => state);
  const user_id = auth?.response?.user_id;
  const username = auth?.response?.username;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setAgentDetails({ ...agentDetails, user_id, created_by: username });
  }, [agentFlowtoggle]);

  useEffect(() => {
    dispatch(fetchAgentList(user_id));
    dispatch(
      setBreadcrumbs([{ label: "Chat Agent", path: "chatbot/ai-agents" }])
    );
    dispatch(setInitialNodes([]));
  }, []);

  return (
    <Layout>{agentFlowtoggle ? <AgentLists /> : <VoiceAgentFlow />}</Layout>
  );
}

export default ChatBotAiAgent;
