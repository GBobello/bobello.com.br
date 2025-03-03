"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, AlertCircle, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/providers/LanguageProvider";
import { useTheme } from "next-themes";
import Flag from "react-world-flags";

export default function CallBackPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language, translations, toggleLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

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

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Salva a preferência no localStorage
  };

  useEffect(() => {
    fetchData(); // Buscar dados inicialmente
    const interval = setInterval(fetchData, 3000); // Atualiza a cada 3s

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto max-w-4xl p-6">
        <div className="flex justify-end">
          {/* Botão de troca de idioma com bandeiras */}
          <Button
            onClick={toggleLanguage}
            variant="outline"
            className="flex items-center gap-2"
          >
            {language === "pt" ? (
              <Flag code="BR" alt="Brazil Flag" className="w-5 h-5" />
            ) : (
              <Flag code="US" alt="US Flag" className="w-5 h-5" />
            )}
          </Button>

          {/* Botão para alternar entre Dark Mode e Light Mode */}
          <Button
            onClick={toggleTheme}
            variant="outline"
            className="flex items-center gap-2 ml-4"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </div>
        <div className="flex items-center justify-center h-screen">
          <div className="bg-red-100 text-red-600 p-4 rounded-lg shadow-md flex items-center gap-2">
            <AlertCircle className="w-6 h-6" />
            <span>Error: {error}</span>
          </div>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="flex justify-end">
        {/* Botão de troca de idioma com bandeiras */}
        <Button
          onClick={toggleLanguage}
          variant="outline"
          className="flex items-center gap-2"
        >
          {language === "pt" ? (
            <Flag code="BR" alt="Brazil Flag" className="w-5 h-5" />
          ) : (
            <Flag code="US" alt="US Flag" className="w-5 h-5" />
          )}
        </Button>

        {/* Botão para alternar entre Dark Mode e Light Mode */}
        <Button
          onClick={toggleTheme}
          variant="outline"
          className="flex items-center gap-2 ml-4"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="max-w-2xl w-full shadow-lg border">
          <CardContent className="p-6">
            <h1 className="text-xl font-semibold mb-4">
              {translations.callback}
            </h1>
            <pre className="p-4 rounded-md text-sm overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
