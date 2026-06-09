"use client";

import React, { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import {
  Mail,
  Calendar,
  Keyboard,
  Inbox,
  Send,
  CalendarDays,
  Search,
  Plus,
} from "lucide-react";

import AgentChat from "./components/AgentChat";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"email" | "calendar">("email");
  const [showPalette, setShowPalette] = useState(false);

  // Superhuman Hotkeys: Toggle view windows instantly
  useHotkeys("g + m", () => setActiveTab("email"), { preventDefault: true });
  useHotkeys("g + c", () => setActiveTab("calendar"), { preventDefault: true });

  // Superhuman Core Shortcut: Command Palette lookup menu toggler
  useHotkeys("meta + k, ctrl + k", () => setShowPalette((prev) => !prev), {
    preventDefault: true,
  });
  useHotkeys("escape", () => setShowPalette(false));

  return (
    <div className="min-h-screen bg-[#121212] text-[#e0e0e0] font-sans flex relative">
      {/* 🟢 MODAL OVERLAY: CMD + K Command Palette */}
      {showPalette && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center pt-[15vh]">
          <div className="w-[550px] bg-[#161616] border border-[#262626] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#262626]">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search mail operations or actions... (Esc to exit)"
                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-gray-600"
                autoFocus
              />
            </div>
            <div className="p-2 text-[11px] text-gray-500 uppercase tracking-wider font-semibold px-4 pt-3">
              Actions
            </div>
            <div className="p-2 space-y-0.5">
              <button
                onClick={() => {
                  setActiveTab("email");
                  setShowPalette(false);
                }}
                className="w-full text-left text-xs px-4 py-2.5 rounded-lg hover:bg-[#262626] text-gray-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Inbox size={14} /> <span>Go to Inbox</span>
                </div>
                <kbd className="text-[10px] text-gray-500 bg-[#121212] px-1 rounded">
                  G M
                </kbd>
              </button>
              <button
                onClick={() => {
                  setActiveTab("calendar");
                  setShowPalette(false);
                }}
                className="w-full text-left text-xs px-4 py-2.5 rounded-lg hover:bg-[#262626] text-gray-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Calendar size={14} /> <span>Go to Calendar</span>
                </div>
                <kbd className="text-[10px] text-gray-500 bg-[#121212] px-1 rounded">
                  G C
                </kbd>
              </button>
              <button
                onClick={() => setShowPalette(false)}
                className="w-full text-left text-xs px-4 py-2.5 rounded-lg hover:bg-[#262626] text-orange-400 font-medium flex items-center gap-3"
              >
                <Plus size={14} /> <span>Compose New Draft (Corsair Sync)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-[#262626] p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-8 px-2">
            <div className="h-8 w-8 rounded-lg bg-orange-500 flex items-center justify-center font-bold text-black">
              S
            </div>
            <span className="font-semibold tracking-wide text-white">
              SUPERHUMAN CLONE
            </span>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("email")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === "email" ? "bg-[#262626] text-white font-medium" : "hover:bg-[#1a1a1a] text-gray-400"}`}
            >
              <div className="flex items-center gap-3">
                <Mail size={16} />
                <span>Inbox</span>
              </div>
              <span className="text-xs text-gray-500 bg-[#1c1c1c] px-1.5 py-0.5 rounded border border-[#333]">
                G M
              </span>
            </button>

            <button
              onClick={() => setActiveTab("calendar")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === "calendar" ? "bg-[#262626] text-white font-medium" : "hover:bg-[#1a1a1a] text-gray-400"}`}
            >
              <div className="flex items-center gap-3">
                <Calendar size={16} />
                <span>Calendar</span>
              </div>
              <span className="text-xs text-gray-500 bg-[#1c1c1c] px-1.5 py-0.5 rounded border border-[#333]">
                G C
              </span>
            </button>
          </nav>
        </div>

        {/* Keyboard Helper footer */}
        <div className="bg-[#1a1a1a] p-3 rounded-lg border border-[#262626] text-xs text-gray-400 space-y-1">
          <div className="flex items-center gap-1.5 text-white font-medium mb-1">
            <Keyboard size={14} className="text-orange-400" />
            <span>Keyboard Shortcuts</span>
          </div>
          <div className="flex justify-between">
            <span>Go to Inbox</span>{" "}
            <kbd className="text-gray-500">G then M</kbd>
          </div>
          <div className="flex justify-between">
            <span>Go to Calendar</span>{" "}
            <kbd className="text-gray-500">G then C</kbd>
          </div>
          <div className="flex justify-between">
            <span>Open Command Palette</span>{" "}
            <kbd className="text-gray-500">Ctrl + K</kbd>
          </div>
        </div>
      </aside>

      {/* Main App Feed Area */}
      <main className="flex-1 flex flex-col">
        <header className="h-14 border-b border-[#262626] flex items-center justify-between px-8">
          <h1 className="text-sm font-medium tracking-wide uppercase text-gray-400">
            {activeTab === "email"
              ? "Gmail Workspace"
              : "Google Calendar Workspace"}
          </h1>
          <button className="bg-orange-500 hover:bg-orange-600 text-black text-xs font-bold px-4 py-1.5 rounded transition-all">
            Connect Google Account
          </button>
        </header>

        <div className="p-8 flex-1 overflow-y-auto">
          {activeTab === "email" ? (
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex items-center gap-3 text-gray-400 text-sm pb-2 border-b border-[#262626]">
                <Inbox size={16} /> <span>All Mail Operations via Corsair</span>
              </div>
              <div className="border border-[#262626] rounded-xl divide-y divide-[#262626] bg-[#161616]">
                <div className="p-4 flex items-center justify-between hover:bg-[#1c1c1c] cursor-pointer transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-white text-sm w-32 truncate">
                      Dev Jain (Corsair)
                    </span>
                    <span className="text-sm text-gray-300 max-w-xl truncate">
                      Welcome to the Corsair Hackathon! Here is your setup
                      guide...
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">2:57 PM</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex items-center gap-3 text-gray-400 text-sm pb-2 border-b border-[#262626]">
                <CalendarDays size={16} />{" "}
                <span>Your Scheduled Events via Corsair</span>
              </div>
              <div className="border border-[#262626] rounded-xl p-8 bg-[#161616] text-center text-sm text-gray-500">
                No calendar sync data initialized yet. Click connect above to
                start mapping.
              </div>
            </div>
          )}
        </div>
      </main>
      <AgentChat />
    </div>
  );
}
