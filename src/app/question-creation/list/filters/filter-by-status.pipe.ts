import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusFilter'
})
export class StatusFilterPipe implements PipeTransform {
  transform(items: any[], filterStatus: string): any[] {
    if (!items || !filterStatus) {
      return items;
    }

    return items.filter(item => {
      const calculatedStatus = this.latestTimestamp(item).status;
      return calculatedStatus === filterStatus;
    });
  }
  latestTimestamp(data: any): { timestamp: string, status: string } {
    var submittedTimestamp = 0;
    var rejectedTimestamp = 0;
    var vettedTimestamp = 0;
  
    if (data) {
      if (data.submitted) {
        submittedTimestamp = new Date(data.submitted)?.getTime() || 0;
      }
  
      if (data.rejected) {
        rejectedTimestamp = new Date(data.rejected)?.getTime() || 0;
      }
  
      if (data.vetted) {
        vettedTimestamp = new Date(data.vetted)?.getTime() || 0;
      }
    }
  
    let status = "";
    if (submittedTimestamp > rejectedTimestamp && submittedTimestamp > vettedTimestamp || data.submitted === 'Just Now') {
      status = "Submitted";
    } else if (rejectedTimestamp > vettedTimestamp && rejectedTimestamp > submittedTimestamp) {
      status = "Rejected";
    } else if (vettedTimestamp > rejectedTimestamp && vettedTimestamp > submittedTimestamp) {
      status = "Approved";
    } else if (data.submit === 'yes') {
      status = "Submitted";
    }
  
    return { timestamp: this.formatTimestamp(submittedTimestamp), status: status };
  }
  
  private formatTimestamp(timestamp: number): string {
    // Implement your timestamp formatting logic here if needed
    return timestamp ? new Date(timestamp).toLocaleString() : "";
  }
  
}
