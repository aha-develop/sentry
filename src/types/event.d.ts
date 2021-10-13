declare interface IEventTraceFrame {
  filename?: string;
  absPath?: string;
  module?: string;
  package?: string;
  platform?: string;
  instructionAddr?: string;
  symbolAddr?: string;
  function?: string;
  rawFunction?: string;
  symbol?: string;
  lineNo?: number;
  colNo?: number;
}

declare interface IEventEntryData {
  values: Array<{
    stacktrace: {
      frames: IEventTraceFrame[];
      framesOmitted: any;
      registers: any;
      hasSystemFrames: boolean;
    };
  }>;
}

declare interface IEventEntry {
  type: string;
  data: IEventEntryData;
}

declare interface IEvent {
  id: string;
  groupID: string;
  eventID: string;
  projectID: string;
  title: string;
  message?: string;
  size?: number;
  platform: "javascript";
  nextEventID?: string;
  type?: string;
  tags?: any[];
  entries: IEventEntry[];
}

declare interface IGetEventOptions {
  issue_id: string;
}
