"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Github, Linkedin, Moon, Sun } from "lucide-react"; // Importando os ícones para o modo escuro e claro
import { useLanguage } from "@/providers/LanguageProvider";
import Flag from "react-world-flags";

const GITHUB_USERNAME = "GBobello";

export default function Home() {
  const { language, translations, toggleLanguage } = useLanguage();
  const { theme, setTheme } = useTheme(); // Usando o hook useTheme do next-themes
  const [repos, setRepos] = useState([]);

  // Verifica o tema no localStorage e define a preferência
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [setTheme]);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos`
        );
        const data = await res.json();
        setRepos(data);
      } catch (error) {
        console.error("Erro ao buscar repositórios", error);
      }
    }
    fetchRepos();
  }, []);

  // Função para alternar entre os temas e salvar no localStorage
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Salva a preferência no localStorage
  };

  // Função para baixar o PDF do currículo
  const downloadCurriculo = async () => {
    try {
      const response = await fetch("/api/curriculo");
      if (!response.ok) throw new Error("Erro ao baixar o currículo");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cv_gbobello.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Erro ao baixar o currículo");
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="flex justify-end">
        <Button
          onClick={downloadCurriculo}
          variant="outline"
          className="flex items-center gap-2"
        >
          {/* Ícone SVG de currículo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <rect
              x="6"
              y="3"
              width="12"
              height="18"
              rx="2"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
            />
            <path
              d="M9 7h6M9 11h6M9 15h2"
              strokeWidth="2"
              stroke="currentColor"
              strokeLinecap="round"
            />
          </svg>
          CV
        </Button>

        <Button
          onClick={toggleLanguage}
          variant="outline"
          className="flex items-center gap-2 ml-4"
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

      {/* Perfil */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <Avatar className="w-24 h-24 border-4 border-primary shadow-lg">
          <AvatarImage src="https://github.com/GBobello.png" alt="Avatar" />
          <AvatarFallback>GB</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">Gabriel Bobello</h1>
        <p className="text-muted-foreground">{translations.apresentation}</p>

        {/* Tecnologias */}
        <div className="flex gap-2 flex-wrap mt-3">
          <Badge>Delphi</Badge>
          <Badge>SQL</Badge>
          <Badge>React</Badge>
          <Badge>Next.js</Badge>
          <Badge>TypeScript</Badge>
          <Badge>Tailwind CSS</Badge>
          <Badge>Python</Badge>
          <Badge>HTML</Badge>
          <Badge>CSS</Badge>
        </div>

        {/* Botões para redes sociais */}
        <div className="flex gap-2 mt-4">
          <Button asChild variant="outline" className="mt-4">
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank">
              <Github className="w-5 h-5 mr-2" /> GitHub
            </a>
          </Button>

          <Button asChild variant="outline" className="mt-4">
            <a href={"https://linkedin.com/in/bobello"} target="_blank">
              <Linkedin className="w-5 h-5 ml-2" /> Linkedin
            </a>
          </Button>
        </div>
      </motion.div>

      {/* Projetos */}
      <h2 className="text-xl font-semibold mt-10 mb-4">
        {translations.projects}
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {repos.length > 0 ? (
          repos.map((repo) => (
            <Card
              key={repo.id}
              className="hover:scale-105 transition-transform"
            >
              <CardHeader>
                <CardTitle className="text-lg">{repo.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {repo.description
                    ? repo.description
                    : translations.nondescription}
                </p>
                <Button asChild variant="link" className="mt-2">
                  <a href={repo.html_url} target="_blank">
                    {translations.gitmessage}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>Carregando projetos...</p>
        )}
      </motion.div>
    </div>
  );
}
