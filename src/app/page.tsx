import { initializeDatabase } from "@/lib/mongoose";

export default function Home() {
  initializeDatabase();
  return <div className='h-screen'>Home</div>;
}
