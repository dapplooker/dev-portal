import { redirect } from "next/navigation";
import { commonLabels } from "./constants/common/labels";

export default function Page() {
  const defaultProtocolEnd = commonLabels.theGraphProtocolEndpoint;
  return redirect(`/${defaultProtocolEnd}`);
}
