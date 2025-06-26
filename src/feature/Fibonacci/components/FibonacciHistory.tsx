import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calculator } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { FibonacciResult } from "@/types";

interface FibonacciHistoryProps {
  results: FibonacciResult[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const FibonacciHistory: React.FC<FibonacciHistoryProps> = ({
  results,
  page,
  totalPages,
  onPageChange,
}) => {
  const formatResult = (result: string) =>
    result.length > 50 ? result.slice(0, 50) + "..." : result;

  const renderPaginationLinks = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === page}
              onClick={() => onPageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (
        (i === page - 2 && page > 3) ||
        (i === page + 2 && page < totalPages - 2)
      ) {
        pages.push(
          <PaginationItem key={`ellipsis-${i}`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    return pages;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ประวัติการคำนวณ</CardTitle>
        <CardDescription>ผลลัพธ์การคำนวณ Fibonacci ของคุณ</CardDescription>
      </CardHeader>
      <CardContent>
        {results.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calculator className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>ยังไม่มีประวัติการคำนวณ</p>
            <p className="text-sm">เริ่มต้นโดยการป้อนตัวเลขและกดคำนวณ</p>
          </div>
        ) : (
          <>
            <div className="max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Index</TableHead>
                    <TableHead>ผลลัพธ์</TableHead>
                    <TableHead>เวลา</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell>{result.index}</TableCell>
                      <TableCell className="font-mono break-all text-sm">
                        {formatResult(result.result)}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {result.createdAt}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Pagination className="mt-6 justify-center">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => onPageChange(Math.max(1, page - 1))}
                    aria-disabled={page === 1}
                  />
                </PaginationItem>

                {renderPaginationLinks()}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                    aria-disabled={page === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </CardContent>
    </Card>
  );
};
