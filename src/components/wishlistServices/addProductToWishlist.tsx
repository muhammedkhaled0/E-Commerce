'use client'

import { useContext, useState } from "react";
import { WishlistContext } from "../context/wishlistContext";
import { HeartIcon } from "lucide-react";
import Spinner from "../Spinner";
import { useRouter } from "next/navigation";

export default function AddProductToWishlist({ itemId }: { itemId: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const { getWishlist, userToken } = useContext(WishlistContext);
    const router = useRouter();

    async function addItemToWishlist(itemId: string) {
        if (!userToken) {
            router.push('/login');
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
                method: 'POST',
                body: JSON.stringify({ productId: itemId }),
                headers: {
                    token: userToken,
                    'Content-Type': 'application/json'
                },
            });

            if (!res.ok) throw new Error('Failed to add to wishlist');

            await getWishlist();
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <HeartIcon
                    className="cursor-pointer"
                    onClick={() => addItemToWishlist(itemId)}
                />
            )}
        </>
    );
}
