import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { validateFibonacciIndex } from "@/utils/fibonacci";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface FibonacciFormProps {
  onCalculate: (index: number) => Promise<void>;
  loading: boolean;
}

export const FibonacciForm: React.FC<FibonacciFormProps> = ({
  onCalculate,
  loading,
}) => {
  const [fibIndex, setFibIndex] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateFibonacciIndex(fibIndex)) {
      setError("กรุณาป้อนตัวเลขระหว่าง 0-1000");
      return;
    }

    try {
      await onCalculate(Number.parseInt(fibIndex));
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
    </Card>
  );
};
