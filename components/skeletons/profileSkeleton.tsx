import { Skeleton } from "@nextui-org/skeleton";

export default function ProfileSkeleton() {
    return (
        <div className="max-w-[200px] w-full flex items-center gap-3">
            <div>
                <Skeleton className="flex rounded-full w-10 h-10" />
            </div>
            <div className="w-[200px] m-w-[200px] flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
        </div>
    );
}