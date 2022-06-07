export class Asset
{
    asset_id: string;
    Customer_name: string;
    visit_date: Date;
    Manufacturer: string; 
    Model: string;
    part_quantity: number;
    work_order_id: number;
    case_creation_date: Date;
    case_closed_date: Date;
    part_id: string;
    total_part_cost: number;
    part_unit_cost: number;	
    total_labor_cost: number;	
    labor_cost: number;	
    labor_duration: number;
    Install_date: Date;	
    work_order_owner: string;
}