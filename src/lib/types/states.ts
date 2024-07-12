/**
 * Job states
 */
import {
  BadgeCheckOutline,
  CheckCircleOutline,
  CheckOutline,
  PlayOutline,
  PlusOutline,
  QuestionCircleOutline,
  RefreshOutline,
  ThumbsDownOutline,
  ThumbsUpOutline
} from 'flowbite-svelte-icons';

// https://github.com/zkcloudworker/zkcloudworker-lib/blob/main/src/cloud/worker/job.ts
export type JobStatus =
  | "created"
  | "started"
  | "finished"
  | "failed"
  | "used"
  | "restarted";

export const StateStyles = {
  'unknown': { icon: QuestionCircleOutline, color: 'bg-purple-300 text-black', label: 'Unknown' },
  'created':  { icon: PlusOutline, color: 'bg-blue-600 text-white', label: 'Created' },
  'started':  { icon: PlayOutline, color: 'bg-yellow-500 text-white', label: 'Started' },
  'finished':  { icon: CheckOutline, color: 'bg-green-400 text-white', label: 'Finished' },
  'used': { icon: ThumbsUpOutline, color: 'bg-green-600 text-white', label: 'Used' },
  'failed':  { icon: ThumbsDownOutline, color: 'bg-red-600 text-white', label: 'Failed' }, 
  'restarted':  { icon: RefreshOutline, color: 'bg-yellow-500 text-white', label: 'Restarted' },
};
