import { Button } from "~/components/ui/button";

export default async function Homepage() {
  return (
    <div className="min-h-screen bg-gray-800 p-8 text-gray-100">
      <h1 className="mb-4 text-3xl font-bold">Welcome to My Drive</h1>
      <p className="mb-6">Manage your files and folders easily.</p>
      <div className="flex justify-center">
        <Button className="bg-blue-600 text-white hover:bg-blue-700">
          Get Started
        </Button>
      </div>
    </div>
  );
}
