import { Skeleton } from "@nextui-org/skeleton";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";

export default function TableSkeleton() {
    return (
        <Table
            aria-label="Table skeleton"
        >
            <TableHeader>
                <TableColumn>
                    <Skeleton className="w-3/5 rounded-lg">
                        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                </TableColumn>
                <TableColumn>
                    <Skeleton className="w-3/5 rounded-lg">
                        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                </TableColumn>
                <TableColumn>
                    <Skeleton className="w-3/5 rounded-lg">
                        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                </TableColumn>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <Skeleton className="w-3/5 rounded-lg">
                            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                    </TableCell>
                    <TableCell>
                        <Skeleton className="w-3/5 rounded-lg">
                            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                    </TableCell>
                    <TableCell>
                        <Skeleton className="w-3/5 rounded-lg">
                            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                    </TableCell>
                </TableRow>

            </TableBody>
        </Table>
    )
}