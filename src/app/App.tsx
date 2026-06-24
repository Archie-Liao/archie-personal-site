import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { PostsListPage } from "./pages/PostsListPage";
import { PostPage } from "./pages/PostPage";
import { GraphPage } from "./pages/GraphPage";
import { FeedbackPage } from "./pages/FeedbackPage";
import { AboutPage } from "./pages/AboutPage";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostsListPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/graph" element={<GraphPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
