import ErrorPage from "./ErrorPage";
import notFoundImage from "../../assets/pages/illustrator/not_found.png";

export default function Error404Page() {
  return <ErrorPage code="404" image={notFoundImage} imageAlt="Page not found illustration" message={"Sorry but we could not find the page that\nyou are looking for"} />;
}
