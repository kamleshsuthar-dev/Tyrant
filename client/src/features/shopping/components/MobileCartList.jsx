import { CartItem } from "./CartItem";
import { SkeletonCartItem } from "./SkeletonCartItem";

export function MobileCartList({
  cartItems,
  checkedItems,
  isLoading,
  isLogin,
  onCheckboxChange,
  onUpdateQuantity,
  onDelete
}) {
  if (isLoading) {
    return (
      <>
        <SkeletonCartItem />
      </>
    );
  }

  if (!isLogin && cartItems.length < 1) {
    return (
      <h1 className="text-2xl text-center pt-40">
            User Not Login Yet
      </h1>
    );
  }

  if (cartItems.length < 1) {
    return (
      <h1 className="text-2xl text-center pt-40">
        No items in cart
      </h1>
    );
  }

  return (
    <div className="space-y-4">
      {cartItems.map((cartItem) => (
        <CartItem
          key={cartItem._id}
          cartItem={cartItem}
          isChecked={checkedItems[cartItem._id] || false}
          onCheckboxChange={onCheckboxChange}
          onUpdateQuantity={onUpdateQuantity}
          onDelete={onDelete}
          isMobile={true}
        />
      ))}
    </div>
  );
}