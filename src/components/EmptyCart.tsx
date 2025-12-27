import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyCart({type}:{type:string}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <ShoppingCart className="w-20 h-20 mb-6 opacity-70" />
      <h2 className="text-2xl font-semibold mb-2">Your {type} is empty</h2>
      <p className="text-muted-foreground mb-6 max-w-sm sm:w-full w-3/4 mx-auto">
        Looks like you haven't added anything yet. Browse products and start
        shopping!
      </p>

      <Link href="/products" className=" sm:w-auto">
        <Button className="px-8 py-6 text-lg rounded-2xl w-full sm:w-auto">
          Start Shopping
        </Button>
      </Link>
    </div>
  );
}
