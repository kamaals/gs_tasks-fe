import Tasks from "@/components/molecules/tasks";

export default function Home() {
  return (
    <div className="w-md bg-white p-6 rounded-xl shadow flex flex-col space-y-4">
      <div>
        <span className="text-lg font-bold">Tasks</span>
      </div>
      <div>
        <Tasks />
      </div>
    </div>
  );
}
