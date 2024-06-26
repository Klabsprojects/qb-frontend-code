export declare type questionModel = {
    Mode: 'LIST' | 'CREATE' | 'EDIT' | 'VIEW';
    detailId?: number;
    Data?: string;
    Index?: any;
}

export class questionList {
    q_id: number = 0;
    q_difficulty: string = '';
    type: string = '';
    choice: string = '';
    vetting: string = '';
    translate: string = '';
    selected: any;
}

export class List {
    id: number = 0;
    // q_type :string | null = null;
    // q_class: number = 0;
    // q_subject :string | null = null;
    // q_domain:string | null = null;
    // q_unit:string | null = null;
    // q_sub_topic:string | null = null;
    // q_term:string | null = null;
    // q_chapter:string | null = null;
    // q_topic:string | null = null;
    // questions: number = 0;    
    // selected: any;
    submitted: string | null = null;
    type: string | null = null;
    class: number = 0;
    medium: string | null = null;
    subject: string | null = null;
    chapter: string | null = null;
    topic: string | null = null;
    sub_topic: string | null = null;
    difficulty: string | null = null;
    // verified_flag: string | null = null;
    selected: any;
    q_count: number = 0;
    ids: any;
    approved: string = '';
    vetted: string = '';
    rejected: string = '';
}

export class createQuestion {
    questions: questionAdd[] = [];
    choices: addChoices[] = [];
}

export class questionAdd {
    // d_id : number = 0;
    // q_format: number = 0;
    // q_text: string | null = null;
    // q_img?: { errors?: any } | null = null;
    // q_clue_text?: string | null = null;
    // q_clue_img?: string | null = null;
    // q_notes?:string | null = null;
    // q_notes_img?:string | null = null;
    // q_link?: string | null = null;
    // qset?:number=0;
    // q_difficulty:string | null = null;
    // left_col_1?: string | null = null;
    // left_col_2?: string | null = null;
    // left_col_3?: string | null = null;
    // left_col_4?: string | null = null;
    // left_col_5?: string | null = null;
    // left_col_6?: string | null = null;
    // img_left__col_1?:string | null = null;
    // img_left__col_2?:string | null = null;
    // img_left__col_3?:string | null = null;
    // img_left__col_4?:string | null = null;
    // img_left__col_5?:string | null = null;
    // img_left__col_6?:string | null = null;
    // right_col_1?: string | null = null;
    // right_col_2?: string | null = null;
    // right_col_3?: string | null = null;
    // right_col_4?: string | null = null;
    // right_col_5?: string | null = null;
    // right_col_6?: string | null = null;
    // img_right__col_1?:string | null = null;
    // img_right__col_2?: string | null = null;
    // img_right__col_3?: string | null = null;
    // img_right__col_4?: string | null = null;
    // img_right__col_5?: string | null = null;
    // img_right__col_6?: string | null = null;
    type: string | null = null;
    class: number = 0;
    medium: string | null = null;
    subject: string | null = null;
    chapter: string | null = null;
    topic: string | null = null;
    tags: string | null = null;
    sub_topic?: string | null = null;
    difficulty: string | null = null;
    format: number = 0;
    text: string | null = null;
    img: string | null = null;
    clue_text: string | null = null;
    clue_img: string | null = null;
    notes?: string | null = null;
    notes_img?: string | null = null;
    link?: string | null = null;
    qset?: string | null = null;
    seq_no?: string | null = null;
    choices: addChoices[] = [];
}

export class addChoices {
    id: number = 0;
    q_id: number = 0;
    choice_id: number = 0;
    choice_text: any[] | null = null;
    choice_text_tn: any[] | null = null;
    choice_img: string | null = null;
    choice_img_tn: string | null = null;
    choice_correct_yn: any[] | null = null;
    choice_correct_yn_tn :any[] | null = null;
    choice_notes: any[] | null = null;
    choice_notes_tn:any[] | null = null;
    choice_link: string | null = null;
    choice_weight: string | null = null;
    medinstr_id: string | null = null;
    trans_appd_by: string | null = null;
    trans_appd_date: string | null = null;
    isactive: string | null = null;
    created_date: string | null = null;
    updated_date: string | null = null;
    encoded_img_name: string | null = null;
    choice_format: string | null = null;
}

export class addDetails {
    // d_id: number = 0;
    q_class: number | null = null;
    q_medium: string | null = null;
    q_subject: string | null = null;
    q_subject_id: string | null = null;
    q_type: string | null = null;
    q_domain: string | null = null;
    q_domain_id: string | null = null;
    q_unit: string | null = null;
    q_sub_topic: string | null = null;
    q_term: string | null = null;
    q_chapter: string | null = null;
    q_topic: string | null = null;
    q_lo: string | null = null;
    q_mlo: string | null = null;
    q_cognitive: string | null = null;
    q_difficulty: string | null = null;
    q_competence: string | null = null;
    aut_id: string | null = null;
    edi_no: string | null = null;
    edi_year: string | null = null;
    book_id: string | null = null;
    q_tag_id: string | null = null;
    q_concept: string | null = null;
    past_year: string | null = null;
    taxonomy_id: string | null = null;
    q_rating: string | null = null;
    q_tags: string | null = null;
    q_mmcompetence: string | null = null;
}

export class DashboardData {
    u_creators: number = 0;
    u_curator: number = 0;
    q_all: number = 0;
    q_today: number = 0;
    q_submitted: number = 0;
    q_approved: number = 0;
}
export class QuestionApprove {
    vetted: string = '';
}