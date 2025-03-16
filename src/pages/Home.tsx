import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
export default function Home() {
  const { logout } = useAuthStore();
  const handleclick = () => {
    logout();
  };
  return <Button onClick={handleclick}>logout</Button>;
}
