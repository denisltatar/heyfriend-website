"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, MessageSquare, Send, Loader2, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Feedback {
  id: number;
  content: string;
  upvotes: number;
  downvotes: number;
  score: number;
  created_at: string;
  user_vote?: 'up' | 'down' | null;
}

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [newFeedback, setNewFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Get or create a session ID for consistent user identification
  const getSessionId = (): string => {
    if (typeof window === 'undefined') return 'anonymous';
    
    let sessionId = localStorage.getItem('feedback_session_id');
    if (!sessionId) {
      // Generate a unique session ID
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem('feedback_session_id', sessionId);
    }
    return sessionId;
  };

  // Fetch feedback on load
  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const sessionId = getSessionId();
      const response = await fetch('/api/feedback', {
        headers: {
          'X-Session-ID': sessionId,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFeedback(data.feedback);
      }
    } catch (err) {
      console.error('Error fetching feedback:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newFeedback.trim() || newFeedback.trim().length < 10) {
      setError("Feedback must be at least 10 characters long");
      return;
    }

    if (newFeedback.trim().length > 1000) {
      setError("Feedback must be less than 1000 characters");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newFeedback.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setNewFeedback("");
        // Refresh feedback list
        await fetchFeedback();
      } else {
        setError(data.error || "Failed to submit feedback");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVote = async (feedbackId: number, voteType: 'up' | 'down') => {
    // Optimistically update the UI to avoid reordering
    const currentItem = feedback.find(item => item.id === feedbackId);
    if (!currentItem) return;

    const currentVote = currentItem.user_vote;
    
    // Determine new user vote state
    let newUserVote: 'up' | 'down' | null = voteType;
    if (currentVote === voteType) {
      // Clicking the same vote type removes the vote
      newUserVote = null;
    }

    // Optimistically update state immediately (preserve order)
    setFeedback(prevFeedback => {
      return prevFeedback.map(item => {
        if (item.id === feedbackId) {
          // Calculate optimistic counts
          let newUpvotes = item.upvotes;
          let newDownvotes = item.downvotes;
          let newScore = item.score;

          if (currentVote === voteType) {
            // Removing vote
            if (voteType === 'up') {
              newUpvotes = Math.max(0, item.upvotes - 1);
              newScore = item.score - 1;
            } else {
              newDownvotes = Math.max(0, item.downvotes - 1);
              newScore = item.score + 1;
            }
          } else if (currentVote === null) {
            // Adding new vote
            if (voteType === 'up') {
              newUpvotes = item.upvotes + 1;
              newScore = item.score + 1;
            } else {
              newDownvotes = item.downvotes + 1;
              newScore = item.score - 1;
            }
          } else {
            // Changing vote type
            if (voteType === 'up') {
              newUpvotes = item.upvotes + 1;
              newDownvotes = Math.max(0, item.downvotes - 1);
              newScore = item.score + 2;
            } else {
              newUpvotes = Math.max(0, item.upvotes - 1);
              newDownvotes = item.downvotes + 1;
              newScore = item.score - 2;
            }
          }

          return {
            ...item,
            upvotes: newUpvotes,
            downvotes: newDownvotes,
            score: newScore,
            user_vote: newUserVote,
          };
        }
        return item;
      });
    });

    try {
      const sessionId = getSessionId();
      const response = await fetch(`/api/feedback/${feedbackId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-ID': sessionId,
        },
        body: JSON.stringify({ voteType }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Update with actual server values (still preserve order)
        setFeedback(prevFeedback => {
          return prevFeedback.map(item => {
            if (item.id === feedbackId) {
              return {
                ...item,
                upvotes: data.newUpvotes,
                downvotes: data.newDownvotes,
                score: data.newScore,
                user_vote: newUserVote,
              };
            }
            return item;
          });
        });
      } else {
        // Revert on error
        setFeedback(prevFeedback => {
          return prevFeedback.map(item => {
            if (item.id === feedbackId) {
              return currentItem;
            }
            return item;
          });
        });
        const errorData = await response.json().catch(() => ({}));
        console.error('Vote failed:', errorData);
      }
    } catch (err) {
      // Revert on error
      setFeedback(prevFeedback => {
        return prevFeedback.map(item => {
          if (item.id === feedbackId) {
            return currentItem;
          }
          return item;
        });
      });
      console.error('Error voting:', err);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-50">
      {/* Header */}
      <div className="border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-5">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2.5 text-slate-600 hover:text-slate-800 transition-colors group">
              <Image
                src="/newest-logo.png"
                alt="HeyFriend Logo"
                width={28}
                height={28}
                className="w-7 h-7 rounded-lg group-hover:scale-105 transition-transform"
              />
              <span className="font-semibold text-sm sm:text-base">Back to HeyFriend</span>
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-100 rounded-xl">
                <MessageSquare className="h-5 w-5 text-amber-600" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Feedback</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Anonymous Notice */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-5 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-2.5 bg-blue-100 rounded-lg">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-blue-900 text-lg mb-1">Your Feedback is 100% Anonymous</h3>
              <p className="text-blue-700 text-sm leading-relaxed">
                We don&apos;t collect any personal information. Your feedback is completely anonymous and secure. Share openly and honestly—we can&apos;t see who you are.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Submit Feedback Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-slate-200/60 mb-8 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-gradient-to-br from-amber-400 to-orange-400 rounded-xl shadow-md">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Share Your Feedback</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={newFeedback}
              onChange={(e) => {
                setNewFeedback(e.target.value);
                setError("");
              }}
              placeholder="What would you like to see improved? What features do you want? Share your thoughts..."
              className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 resize-none transition-all text-sm sm:text-base"
              rows={5}
              maxLength={1000}
              disabled={submitting}
            />
            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-500 font-medium">
                {newFeedback.length}/1000 characters
              </div>
              {error && (
                <p className="text-sm text-red-600 font-medium">{error}</p>
              )}
            </div>
            <motion.button
              type="submit"
              disabled={submitting || !newFeedback.trim() || newFeedback.trim().length < 10}
              whileHover={{ scale: submitting ? 1 : 1.02, y: -1 }}
              whileTap={{ scale: submitting ? 1 : 0.98 }}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:hover:shadow-lg"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Feedback
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Feedback List */}
        <div className="space-y-5">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
                <p className="text-slate-600 font-medium">Loading feedback...</p>
              </div>
            </div>
          ) : feedback.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/70 backdrop-blur-sm rounded-3xl p-16 text-center border border-slate-200/60 shadow-lg"
            >
              <div className="p-4 bg-amber-100 rounded-2xl w-fit mx-auto mb-6">
                <MessageSquare className="h-16 w-16 text-amber-600" />
              </div>
              <p className="text-slate-700 text-lg font-medium">No feedback yet. Be the first to share your thoughts!</p>
            </motion.div>
          ) : (
            feedback.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="bg-white/70 backdrop-blur-sm rounded-3xl p-4 sm:p-5 border border-slate-200/60 shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex gap-3 sm:gap-4">
                  {/* Vote Buttons */}
                  <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                    <motion.button
                      onClick={() => handleVote(item.id, 'up')}
                      className={`relative p-2.5 rounded-xl transition-all ${
                        item.user_vote === 'up'
                          ? 'bg-gradient-to-br from-green-500 to-green-600 text-white border-2 border-green-700 shadow-lg scale-110'
                          : 'bg-slate-100 text-slate-600 hover:bg-green-50 hover:text-green-600 border-2 border-transparent hover:border-green-200'
                      }`}
                      whileHover={{ scale: item.user_vote === 'up' ? 1.1 : 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      title={item.user_vote === 'up' ? 'Remove upvote' : 'Upvote'}
                    >
                      {item.user_vote === 'up' ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <ArrowUp className="h-5 w-5" />
                      )}
                    </motion.button>
                    <motion.span 
                      key={`score-${item.id}-${item.score}`}
                      initial={{ scale: 1.4 }}
                      animate={{ scale: 1 }}
                      className={`text-base font-bold transition-colors px-1.5 py-0.5 rounded-lg ${
                        item.score > 0 
                          ? 'text-green-600 bg-green-50' 
                          : item.score < 0 
                          ? 'text-red-600 bg-red-50' 
                          : 'text-slate-600 bg-slate-50'
                      }`}
                    >
                      {item.score}
                    </motion.span>
                    <motion.button
                      onClick={() => handleVote(item.id, 'down')}
                      className={`relative p-2.5 rounded-xl transition-all ${
                        item.user_vote === 'down'
                          ? 'bg-gradient-to-br from-red-500 to-red-600 text-white border-2 border-red-700 shadow-lg scale-110'
                          : 'bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 border-2 border-transparent hover:border-red-200'
                      }`}
                      whileHover={{ scale: item.user_vote === 'down' ? 1.1 : 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      title={item.user_vote === 'down' ? 'Remove downvote' : 'Downvote'}
                    >
                      {item.user_vote === 'down' ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <ArrowDown className="h-5 w-5" />
                      )}
                    </motion.button>
                    {item.user_vote && (
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs font-semibold mt-0.5 px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600"
                      >
                        {item.user_vote === 'up' ? 'Upvoted' : 'Downvoted'}
                      </motion.span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <p className="text-slate-800 leading-relaxed mb-2 break-words text-base">
                      {item.content}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="px-2 py-0.5 bg-slate-100 rounded-md font-medium">{item.upvotes} upvotes</span>
                      <span className="px-2 py-0.5 bg-slate-100 rounded-md font-medium">{item.downvotes} downvotes</span>
                      <span className="px-2 py-0.5 bg-slate-100 rounded-md font-medium">
                        {new Date(item.created_at).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                          timeZone: 'America/New_York',
                          timeZoneName: 'short'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

