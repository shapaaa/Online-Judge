import { getSubmissions } from "@/app/lib/getSubmissions";
import SubmissionsTable from "../components/submissionstable";

const Page = async ({ params: { slug } }) => {
  const submissions = await getSubmissions(slug);
  return (
    <>
      <SubmissionsTable submissions={submissions} />
    </>
  );
};

export default Page;
