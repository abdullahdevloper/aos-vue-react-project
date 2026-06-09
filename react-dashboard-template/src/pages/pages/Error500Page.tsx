import ErrorPage from "./ErrorPage";
import serverDownImage from "../../assets/pages/illustrator/server_down.png";

export default function Error500Page() {
  return <ErrorPage code="500" image={serverDownImage} imageAlt="Server down illustration" message="Whoops! Internal Server Error" />;
}
