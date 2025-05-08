import { redirect } from 'next/navigation';

export default function Home() {
  // This will redirect to the first note
  redirect('/1');
}