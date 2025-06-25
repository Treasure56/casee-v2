import Image from "next/image";
export default function Clients() {
  return (
    <div className="flex -space-x-2">
      {users.map((user) => (
        <Image
          key={user}
          className="inline-block h-8 w-8 md:w-10 md:h-10 rounded-full ring-2 ring-slate-100 object-cover flex-shrink-0 aspect-square"
          src={user}
          alt="Apple Store Badge"
          width={100}
          height={100}
        />
      ))}
    </div>
  );
}

const users = [
  "/images/user1.jpg",
  "/images/user2.jpg",
  "/images/user3.jpg",
  "/images/user4.jpg",
  "/images/user5.jpg",
];
