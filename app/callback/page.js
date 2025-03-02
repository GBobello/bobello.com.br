"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, AlertCircle } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Textarea } from "@/components/ui/textarea";

export default function CallBackPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar os dados da API
  const fetchData = () => {
    fetch("/api/callback")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(); // Buscar dados inicialmente
    const interval = setInterval(fetchData, 3000); // Atualiza a cada 3s

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-gray-600" />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 text-red-600 p-4 rounded-lg shadow-md flex items-center gap-2">
          <AlertCircle className="w-6 h-6" />
          <span>Error: {error}</span>
        </div>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="max-w-2xl w-full shadow-lg border border-gray-200">
        <CardContent className="p-6">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            Callback Data
          </h1>
          <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700 overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
