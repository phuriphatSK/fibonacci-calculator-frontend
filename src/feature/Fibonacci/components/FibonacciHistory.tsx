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
import type { FibonacciResult } from "@/types";

interface FibonacciHistoryProps {
  results: FibonacciResult[];
}

export const FibonacciHistory: React.FC<FibonacciHistoryProps> = ({
  results,
}) => {
  const formatResult = (result: string) => {
    return result.length > 50 ? `${result.substring(0, 50)}...` : result;
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
                    <TableCell className="font-medium">
                      {result.index}
                    </TableCell>
                    <TableCell className="font-mono text-sm break-all">
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
        )}
      </CardContent>
    </Card>
  );
};
