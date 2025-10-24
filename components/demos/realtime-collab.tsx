"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Users, MousePointer2, Pencil, Trash2 } from "lucide-react";

interface User {
  id: string;
  name: string;
  colorClass: string;
  bgClass: string;
  x: number;
  y: number;
}

interface Note {
  id: string;
  text: string;
  x: number;
  y: number;
  colorClass: string;
  bgClass: string;
  author: string;
}

const DEMO_USERS = [
  { id: "1", name: "You", colorClass: "text-primary", bgClass: "bg-primary" },
  {
    id: "2",
    name: "Sarah",
    colorClass: "text-destructive",
    bgClass: "bg-destructive",
  },
  { id: "3", name: "Mike", colorClass: "text-warning", bgClass: "bg-warning" },
  { id: "4", name: "Alex", colorClass: "text-info", bgClass: "bg-info" },
];

export function RealtimeCollabDemo() {
  const [isCursorOnBoard, setIsCursorOnBoard] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      text: "Welcome to real-time collaboration!",
      x: 20,
      y: 20,
      colorClass: "text-primary",
      bgClass: "bg-primary",
      author: "You",
    },
    {
      id: "2",
      text: "Multiple users can edit simultaneously",
      x: 200,
      y: 100,
      colorClass: "text-destructive",
      bgClass: "bg-destructive",
      author: "Sarah",
    },
    {
      id: "3",
      text: "WebSocket-powered for instant updates",
      x: 50,
      y: 200,
      colorClass: "text-warning",
      bgClass: "bg-warning",
      author: "Mike",
    },
    {
      id: "4",
      text: "Drag notes anywhere on the board!",
      x: 300,
      y: 50,
      colorClass: "text-primary",
      bgClass: "bg-primary",
      author: "You",
    },
  ]);
  const [newNoteText, setNewNoteText] = useState("");
  const [draggedNote, setDraggedNote] = useState<string | null>(null);
  const [userCursor, setUserCursor] = useState({ x: 0, y: 0 });
  const [isUserDragging, setIsUserDragging] = useState(false);
  const [simulatedDrags, setSimulatedDrags] = useState<{
    [userId: string]: { noteId: string; startTime: number } | null;
  }>({});
  const simulatedDragsRef = useRef(simulatedDrags);
  const boardRef = useRef<HTMLDivElement>(null);

  // Refs to maintain drag state across re-renders
  const dragStateRef = useRef({
    isMouseDown: false,
    draggedNoteId: null as string | null,
    dragStartOffset: { x: 0, y: 0 },
  });
  const notesRef = useRef(notes);

  // Update notes ref when notes change
  useEffect(() => {
    notesRef.current = notes;
  }, [notes]);

  // Keep ref updated
  useEffect(() => {
    simulatedDragsRef.current = simulatedDrags;
  }, [simulatedDrags]);

  // Simulate other users' cursors moving with more natural movement and note dragging
  useEffect(() => {
    const interval = setInterval(() => {
      setUsers((prevUsers) => {
        if (prevUsers.length === 0) {
          // Distribute users across the entire board randomly
          const boardWidth = boardRef.current
            ? boardRef.current.offsetWidth
            : 580;
          const boardHeight = boardRef.current
            ? boardRef.current.offsetHeight
            : 450;

          return DEMO_USERS.slice(1).map((user) => ({
            ...user,
            x: 50 + Math.random() * (boardWidth - 100), // Random distribution across full width
            y: 50 + Math.random() * (boardHeight - 100), // Random distribution across full height
          }));
        }

        return prevUsers.map((user) => {
          // Much more active movement patterns - free movement across entire board
          const shouldMove = Math.random() > 0.02; // 98% chance to move (even more active)
          if (!shouldMove) return user;

          // Free movement across entire board with some clustering around notes
          const boardWidth = boardRef.current
            ? boardRef.current.offsetWidth
            : 580;
          const boardHeight = boardRef.current
            ? boardRef.current.offsetHeight
            : 450;

          // Sometimes cluster around existing notes, sometimes explore freely
          const clusterAroundNotes = Math.random() < 0.3; // Reduced to 30% chance to cluster
          let target;

          if (clusterAroundNotes && notes.length > 0) {
            // Choose a random note to cluster around
            const randomNote = notes[Math.floor(Math.random() * notes.length)];
            // Add some offset around the note
            const offsetX = (Math.random() - 0.5) * 100; // ±50px around note
            const offsetY = (Math.random() - 0.5) * 80; // ±40px around note
            target = {
              x: Math.max(
                20,
                Math.min(boardWidth - 20, randomNote.x + offsetX)
              ),
              y: Math.max(
                20,
                Math.min(boardHeight - 20, randomNote.y + offsetY)
              ),
            };
          } else {
            // Free exploration across entire board
            target = {
              x: 20 + Math.random() * (boardWidth - 40),
              y: 20 + Math.random() * (boardHeight - 40),
            };
          }

          // Calculate direction towards target with some randomness
          const dx = target.x - user.x;
          const dy = target.y - user.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // If far from target, move towards it; if close, add more randomness
          let moveX, moveY;
          if (distance > 60) {
            // Move towards target (bigger, more dynamic steps)
            const speed = 45 + Math.random() * 70; // Increased speed for more movement
            moveX = (dx / distance) * speed + (Math.random() - 0.5) * 60;
            moveY = (dy / distance) * speed + (Math.random() - 0.5) * 60;
          } else {
            // Explore around current area with much larger radius
            moveX = (Math.random() - 0.5) * 220; // Increased exploration radius
            moveY = (Math.random() - 0.5) * 180; // Increased exploration radius
          }

          // Add occasional large jumps but less frequently
          if (Math.random() < 0.08) {
            // Increased frequency for more movement across board
            moveX *= 2.5;
            moveY *= 2.5;
          }

          // Responsive boundaries - leave margin for cursor visibility
          const maxX = boardWidth - 60; // Leave space for cursor and label
          const maxY = boardHeight - 40; // Leave space for cursor and label
          const newX = Math.max(10, Math.min(maxX, user.x + moveX));
          const newY = Math.max(10, Math.min(maxY, user.y + moveY));

          return { ...user, x: newX, y: newY };
        });
      });

      // Simulate note dragging by other users - more realistic approach
      setSimulatedDrags((prevDrags) => {
        const newDrags = { ...prevDrags };

        // For each user, decide if they should start/stop dragging
        DEMO_USERS.slice(1).forEach((user) => {
          const currentDrag = newDrags[user.id];
          const now = Date.now();

          if (!currentDrag) {
            // 6% chance to start dragging a note (less frequent for balanced activity)
            if (Math.random() < 0.06) {
              // Find available notes that aren't being dragged
              const availableNotes = notes.filter(
                (note) =>
                  !Object.values(newDrags).some((d) => d?.noteId === note.id)
              );
              if (availableNotes.length > 0) {
                // Choose a random note to drag
                const randomNote =
                  availableNotes[
                    Math.floor(Math.random() * availableNotes.length)
                  ];
                newDrags[user.id] = {
                  noteId: randomNote.id,
                  startTime: now,
                };
              }
            }
          } else {
            // Continue dragging for 4-6 seconds, then stop (balanced duration)
            const dragDuration = now - currentDrag.startTime;
            if (dragDuration > 4000 + Math.random() * 2000) {
              delete newDrags[user.id];
            }
          }
        });

        return newDrags;
      });

      // Move notes being dragged
      setNotes((prevNotes) => {
        return prevNotes.map((note) => {
          // Find if this note is being dragged by any user
          const draggingUser = Object.entries(simulatedDragsRef.current).find(
            ([, drag]) => drag?.noteId === note.id
          );

          if (draggingUser) {
            const [userId] = draggingUser;
            const user = users.find((u) => u.id === userId);

            if (user) {
              // Move note freely across the entire board with more dynamic movement
              const boardWidth = boardRef.current
                ? boardRef.current.offsetWidth
                : 580;
              const boardHeight = boardRef.current
                ? boardRef.current.offsetHeight
                : 450;

              // Generate new random target every few movements for more freedom
              const newTarget = {
                x: 20 + Math.random() * (boardWidth - 220),
                y: 20 + Math.random() * (boardHeight - 160),
              };

              // More dynamic movement with higher speed and more randomness
              const moveSpeed = 0.12; // Much faster movement
              const randomFactor = 0.3; // Add randomness to movement

              const deltaX =
                (newTarget.x - note.x) * moveSpeed +
                (Math.random() - 0.5) * randomFactor * boardWidth;
              const deltaY =
                (newTarget.y - note.y) * moveSpeed +
                (Math.random() - 0.5) * randomFactor * boardHeight;

              return {
                ...note,
                x: Math.max(10, Math.min(boardWidth - 210, note.x + deltaX)),
                y: Math.max(10, Math.min(boardHeight - 150, note.y + deltaY)),
              };
            }
          }
          return note;
        });
      });
    }, 400); // Even faster updates for more dynamic feel

    return () => clearInterval(interval);
  }, [notes, users]);

  // Track user cursor position and handle custom drag
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!boardRef.current) return;

      // Si el click ocurre sobre el botón de eliminar, no iniciar drag
      const target = e.target as HTMLElement;
      if (target.closest("button[data-trash]")) {
        return;
      }

      const rect = boardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if clicking on a note
      const clickedNote = notesRef.current.find((note) => {
        const noteWidth = window.innerWidth < 768 ? 160 : 192; // Responsive width
        const noteHeight = window.innerWidth < 768 ? 96 : 120; // Responsive height
        const noteLeft = note.x;
        const noteRight = note.x + noteWidth;
        const noteTop = note.y;
        const noteBottom = note.y + noteHeight;

        return (
          x >= noteLeft && x <= noteRight && y >= noteTop && y <= noteBottom
        );
      });

      if (clickedNote) {
        dragStateRef.current.isMouseDown = true;
        dragStateRef.current.draggedNoteId = clickedNote.id;
        dragStateRef.current.dragStartOffset = {
          x: x - clickedNote.x,
          y: y - clickedNote.y,
        };
        setDraggedNote(clickedNote.id);
        setIsUserDragging(true);
        document.body.style.cursor = "none";
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!boardRef.current) return;

      const rect = boardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update cursor position
      setUserCursor({
        x: Math.max(0, Math.min(rect.width, x)),
        y: Math.max(0, Math.min(rect.height, y)),
      });

      // Handle dragging (fluido con requestAnimationFrame)
      if (
        dragStateRef.current.isMouseDown &&
        dragStateRef.current.draggedNoteId
      ) {
        const newX = x - dragStateRef.current.dragStartOffset.x;
        const newY = y - dragStateRef.current.dragStartOffset.y;

        // Responsive boundaries
        const noteWidth = window.innerWidth < 768 ? 160 : 192;
        const noteHeight = window.innerWidth < 768 ? 96 : 120;
        const maxX = rect.width - noteWidth;
        const maxY = rect.height - noteHeight;

        // Animación fluida usando requestAnimationFrame
        window.requestAnimationFrame(() => {
          setNotes((prevNotes) =>
            prevNotes.map((note) =>
              note.id === dragStateRef.current.draggedNoteId
                ? {
                    ...note,
                    x: Math.max(0, Math.min(maxX, newX)),
                    y: Math.max(0, Math.min(maxY, newY)),
                  }
                : note
            )
          );
        });
      }
    };

    const handleMouseUp = () => {
      if (dragStateRef.current.isMouseDown) {
        dragStateRef.current.isMouseDown = false;
        dragStateRef.current.draggedNoteId = null;
        dragStateRef.current.dragStartOffset = { x: 0, y: 0 };
        setDraggedNote(null);
        setIsUserDragging(false);
        document.body.style.cursor = "";
      }
    };

    const board = boardRef.current;
    if (board) {
      board.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        board.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
      };
    }
  }, []); // Remove notes dependency to prevent re-initialization

  const addNote = () => {
    if (!newNoteText.trim()) return;
    const newNote: Note = {
      id: Date.now().toString(),
      text: newNoteText,
      x: Math.random() * 400 + 50,
      y: Math.random() * 200 + 50,
      colorClass: DEMO_USERS[0].colorClass,
      bgClass: DEMO_USERS[0].bgClass,
      author: DEMO_USERS[0].name,
    };
    setNotes([...notes, newNote]);
    setNewNoteText("");
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    // Si la nota eliminada es la que se está arrastrando, limpiar el estado de drag
    if (draggedNote === id) {
      dragStateRef.current.isMouseDown = false;
      dragStateRef.current.draggedNoteId = null;
      dragStateRef.current.dragStartOffset = { x: 0, y: 0 };
      setDraggedNote(null);
      setIsUserDragging(false);
      if (typeof document !== "undefined") {
        document.body.style.cursor = "";
      }
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium">
            {users.length + 1} users online
          </span>
        </div>
        <div className="flex gap-2">
          {DEMO_USERS.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-2 glass-card px-3 py-1 rounded-full"
            >
              <div className={`w-2 h-2 rounded-full ${user.bgClass}`} />
              <span className="text-xs">{user.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Add a sticky note..."
          value={newNoteText}
          onChange={(e) => setNewNoteText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNote()}
          className="glass-card border-white/20"
        />
        <Button onClick={addNote} className="bg-primary hover:bg-primary/90">
          <Pencil className="w-4 h-4 mr-2" />
          Add Note
        </Button>
      </div>

      <Card
        ref={boardRef}
        className="relative h-[400px] md:h-[450px] bg-gradient-to-br from-background/50 to-background/30 border-white/20 overflow-hidden"
        style={{
          cursor: "none", // Always hide cursor on board
        }}
        onMouseEnter={() => setIsCursorOnBoard(true)}
        onMouseLeave={() => setIsCursorOnBoard(false)}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* User cursor */}
        {isCursorOnBoard &&
          (() => {
            const draggedNoteData = draggedNote
              ? notes.find((n) => n.id === draggedNote)
              : null;
            const cursorX =
              isUserDragging && draggedNoteData
                ? draggedNoteData.x + 96
                : userCursor.x;
            const cursorY =
              isUserDragging && draggedNoteData
                ? draggedNoteData.y + 50
                : userCursor.y;

            return (
              <div
                className="absolute pointer-events-none z-30"
                style={{ left: cursorX, top: cursorY }}
              >
                <MousePointer2
                  className={`w-5 h-5 ${DEMO_USERS[0].colorClass}`}
                />
                <span className="ml-2 text-xs font-medium px-2 py-1 rounded-full bg-black/50 text-white">
                  {DEMO_USERS[0].name}
                  {isUserDragging && " (dragging)"}
                </span>
              </div>
            );
          })()}

        {/* Other users' cursors */}
        {users.map((user) => {
          const isDragging = simulatedDragsRef.current[user.id];
          const draggedNote = isDragging
            ? notes.find((n) => n.id === isDragging.noteId)
            : null;

          return (
            <div
              key={user.id}
              className="absolute pointer-events-none transition-all duration-1000 ease-out z-30"
              style={{
                left: isDragging && draggedNote ? draggedNote.x + 96 : user.x,
                top: isDragging && draggedNote ? draggedNote.y + 50 : user.y,
              }}
            >
              <MousePointer2 className={`w-5 h-5 ${user.colorClass}`} />
              <span className="ml-2 text-xs font-medium px-2 py-1 rounded-full bg-black/50 text-white">
                {user.name}
                {isDragging && " (dragging)"}
              </span>
            </div>
          );
        })}

        {/* Sticky notes */}
        {notes.map((note) => (
          <div
            key={note.id}
            className={`absolute w-40 md:w-48 p-3 md:p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow group select-none cursor-none ${
              note.bgClass
            }/20 border-l-4 ${note.colorClass.replace("text-", "border-")}`}
            style={{
              left: note.x,
              top: note.y,
              willChange: "transform, left, top",
              transition:
                draggedNote === note.id
                  ? "none"
                  : "left 0.18s cubic-bezier(.4,2,.3,1), top 0.18s cubic-bezier(.4,2,.3,1)",
              pointerEvents: draggedNote === note.id ? "none" : "auto",
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs md:text-sm font-medium opacity-70">
                {note.author}
              </span>
              <Button
                size="sm"
                variant="ghost"
                className="h-5 w-5 md:h-6 md:w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity cursor-none"
                data-trash
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => deleteNote(note.id)}
              >
                <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
              </Button>
            </div>
            <p className="text-xs md:text-sm">{note.text}</p>
          </div>
        ))}
      </Card>

      <p className="text-xs text-muted-foreground text-center">
        Drag notes to reposition • Simulated real-time cursors • AI users drag
        notes realistically • Notes maintain their original content •
        WebSocket-ready architecture
      </p>
    </div>
  );
}
