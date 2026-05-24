import ProtectedRoute from "../../app/components/ProtectedRoute";
import CartPage from "./CartPage";

export default function CartProtected() {
  return (
    <ProtectedRoute>
      <CartPage />
    </ProtectedRoute>
  );
}
