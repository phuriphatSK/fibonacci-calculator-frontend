import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateFibonacciIndex } from "@/utils/fibonacci";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface FibonacciFormProps {
  onCalculate: (index: number) => Promise<{
    index: number;
    result: string;
    createdAt?: string;
  }>;
  loading: boolean;
}

export const FibonacciForm: React.FC<FibonacciFormProps> = ({
  onCalculate,
  loading,
}) => {
  const [fibIndex, setFibIndex] = useState("");
  const [error, setError] = useState("");
  const [latestResult, setLatestResult] = useState<{
    index: number;
    result: string;
    createdAt?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateFibonacciIndex(fibIndex)) {
      setError("กรุณาป้อนตัวเลขระหว่าง 0-1000");
      return;
    }

    try {
      const result = await onCalculate(Number.parseInt(fibIndex));
      setLatestResult(result);
      setFibIndex("");
    } catch {
      setError("เกิดข้อผิดพลาดในการคำนวณ");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>คำนวณ Fibonacci</CardTitle>
        <CardDescription>
          ป้อนตัวเลข index เพื่อคำนวณค่า Fibonacci
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fibIndex">Fibonacci Index</Label>
            <div className="mt-3">
              <Input
                id="fibIndex"
                type="number"
                min="0"
                max="1000"
                value={fibIndex}
                onChange={(e) => setFibIndex(e.target.value)}
                placeholder="ป้อนตัวเลข (เช่น 10)"
                required
                disabled={loading}
              />
            </div>

            <p className="text-sm text-gray-500 mt-3">
              ป้อนตัวเลขระหว่าง 0-1000
            </p>
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading || !fibIndex}
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                <span className="text-black">กำลังคำนวณ...</span>
              </>
            ) : (
              <span className="text-black">คำนวณ</span>
            )}
          </Button>
        </form>
      </CardContent>

      {latestResult && (
        <CardFooter className="flex flex-col items-start gap-2 p-4 rounded-b-xl border-t">
          <p className="text-sm font-semibold text-gray-700">ผลลัพธ์ล่าสุด:</p>
          <div className="text-sm text-gray-600 font-mono break-all">
            <strong>Index:</strong> {latestResult.index}
          </div>
          <div className="text-sm text-gray-600 font-mono break-all">
            <strong>Result:</strong> {latestResult.result}
          </div>
          {latestResult.createdAt && (
            <div className="text-xs text-gray-400">
              <strong>เวลา:</strong>{" "}
              {new Date(latestResult.createdAt).toLocaleString()}
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
};
