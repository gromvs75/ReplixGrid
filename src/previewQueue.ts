/** One exact build in flight; newer edits replace the waiting snapshot. */
export class PreviewQueue<T> {
  private serial = 0;
  latest: {revision: number; project: T} | null = null;
  flight: {revision: number; project: T} | null = null;
  constructor(private enabled: (project: T) => boolean) {}
  submit(project: T) {
    this.latest = {revision: ++this.serial, project};
  }
  take() {
    if (this.flight || !this.latest || !this.enabled(this.latest.project)) return null;
    this.flight = this.latest;
    return this.flight;
  }
  complete(revision: number) {
    if (!this.flight || this.flight.revision !== revision) return null;
    const job = this.flight;
    this.flight = null;
    const current = this.latest?.revision === revision;
    return {job, current, visible: !!this.latest && this.enabled(this.latest.project), next: !current};
  }
}
