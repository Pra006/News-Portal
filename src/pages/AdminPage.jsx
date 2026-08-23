import { useState } from "react";
import { Edit3, FilePlus2, LayoutDashboard, Newspaper, Search, Trash2, X } from "lucide-react";
import { categories, authors } from "../data/newsData";
import { useApp } from "../context/AppContext";

const emptyArticle = {
  title: "",
  excerpt: "",
  content: "",
  image: "/images/news1.jpg",
  category: "World",
  author: authors[0],
  publishedAt: "",
  readTime: 3,
  isBreaking: false,
  isFeatured: false,
  isPopular: false,
  tags: [],
};

export default function AdminPage() {
  const { articles, addArticle, updateArticle, deleteArticle, setCurrentPage } = useApp();
  const [query, setQuery] = useState("");
  const [editingArticle, setEditingArticle] = useState(null);

  const filteredArticles = articles.filter((article) =>
    `${article.title} ${article.category}`.toLowerCase().includes(query.toLowerCase())
  );

  const handleSave = (article) => {
    if (article.id) updateArticle(article);
    else addArticle(article);
    setEditingArticle(null);
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-350 mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-red-600">Editorial workspace</p>
            <h1 className="mt-1 text-3xl font-black text-slate-900 dark:text-white">News administration</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Manage stories, visibility, and newsroom metadata.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setCurrentPage("home")} className="rounded-xl border border-gray-200 dark:border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800">View site</button>
            <button onClick={() => setEditingArticle({ ...emptyArticle })} className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"><FilePlus2 size={17} /> New story</button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
          <Metric icon={<Newspaper size={18} />} label="Total stories" value={articles.length} />
          <Metric icon={<LayoutDashboard size={18} />} label="Featured" value={articles.filter((article) => article.isFeatured).length} />
          <Metric icon={<span className="text-lg">●</span>} label="Breaking news" value={articles.filter((article) => article.isBreaking).length} />
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-gray-100 dark:border-slate-800 p-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-bold text-slate-900 dark:text-white">Published stories</h2>
            <div className="flex items-center gap-2 rounded-xl bg-gray-100 dark:bg-slate-800 px-3 py-2 w-full sm:w-72">
              <Search size={16} className="text-gray-400" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search stories" className="min-w-0 flex-1 bg-transparent text-sm outline-none text-slate-900 dark:text-white" />
            </div>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-slate-800">
            {filteredArticles.map((article) => (
              <div key={article.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <img src={article.image} alt="" className="h-16 w-24 rounded-lg object-cover shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                    <span className="text-red-600">{article.category}</span>
                    {article.isBreaking && <span className="rounded-full bg-orange-100 px-2 py-0.5 text-orange-700">Breaking</span>}
                    {article.isFeatured && <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700">Featured</span>}
                  </div>
                  <h3 className="mt-1 truncate font-bold text-slate-900 dark:text-white">{article.title}</h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{article.publishedAt} · {article.readTime} min read</p>
                </div>
                <div className="flex gap-2 sm:shrink-0">
                  <button onClick={() => setEditingArticle({ ...article })} title="Edit story" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-slate-700 px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800"><Edit3 size={15} /> Edit</button>
                  <button onClick={() => window.confirm("Delete this story?") && deleteArticle(article.id)} title="Delete story" className="inline-flex items-center justify-center rounded-lg border border-red-200 px-3 py-2 text-red-600 hover:bg-red-50"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {editingArticle && <ArticleForm article={editingArticle} onSave={handleSave} onClose={() => setEditingArticle(null)} />}
    </section>
  );
}

function Metric({ icon, label, value }) {
  return <div className="flex items-center gap-3 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-900/20">{icon}</span><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p><p className="text-2xl font-black text-slate-900 dark:text-white">{value}</p></div></div>;
}

function ArticleForm({ article, onSave, onClose }) {
  const [form, setForm] = useState({ ...article, tags: article.tags?.join(", ") || "" });
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event) => {
    event.preventDefault();
    onSave({ ...form, readTime: Number(form.readTime), tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean) });
  };

  return <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/50 p-4"><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"><div className="flex items-center justify-between mb-6"><h2 className="text-xl font-bold text-slate-900 dark:text-white">{article.id ? "Edit story" : "New story"}</h2><button onClick={onClose} aria-label="Close editor" className="rounded-full p-2 text-slate-500 hover:bg-gray-100 dark:hover:bg-slate-800"><X size={18} /></button></div><form onSubmit={submit} className="grid gap-4"><Field label="Headline" value={form.title} onChange={(value) => update("title", value)} required /><Field label="Excerpt" value={form.excerpt} onChange={(value) => update("excerpt", value)} required /><label className="text-sm font-medium text-slate-700 dark:text-slate-300">Article content<textarea required value={form.content} onChange={(event) => update("content", event.target.value)} rows={6} className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" /></label><div className="grid gap-4 sm:grid-cols-2"><Field label="Image URL" value={form.image} onChange={(value) => update("image", value)} required /><Field label="Published date" value={form.publishedAt} onChange={(value) => update("publishedAt", value)} required /><SelectField label="Category" value={form.category} options={categories} onChange={(value) => update("category", value)} /><Field label="Read time (minutes)" type="number" value={form.readTime} onChange={(value) => update("readTime", value)} required /></div><Field label="Tags (comma separated)" value={form.tags} onChange={(value) => update("tags", value)} /><div className="flex flex-wrap gap-4">{[["isBreaking", "Breaking news"], ["isFeatured", "Featured story"], ["isPopular", "Popular story"]].map(([key, label]) => <label key={key} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><input type="checkbox" checked={Boolean(form[key])} onChange={(event) => update(key, event.target.checked)} />{label}</label>)}</div><button type="submit" className="mt-2 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700">Save story</button></form></div></div>;
}

function Field({ label, value, onChange, type = "text", required = false }) {
  return <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}<input type={type} required={required} value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" /></label>;
}

function SelectField({ label, value, options, onChange }) {
  return <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white">{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}