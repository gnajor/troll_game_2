<?php
function format_and_insert_data($data, $type){

    $formatted_data = [];

    foreach($data as $data_item){
        $ids = explode(",", $data_item["ingredient_ids"]);
        $names = explode(",", $data_item["ingredient_names"]);
        $amounts = explode(",", $data_item["ingredient_amounts"]);

        $formatted_item = [
            "id" => $data_item["id"],
            "name" => $data_item["name"],
        ];

        if($type === "food"){
            $formatted_item["prep_method"] = $data_item["prep_method"];
            $formatted_item["prep_time"] = $data_item["prep_time"];
            $formatted_item["rot_time"] = $data_item["rot_time"];
            $formatted_item["dispose_time"] = $data_item["dispose_time"];
        }

        for($i = 0; $i < count($ids); $i++){
            $formatted_item["ingredients"][] = [
                "id" => intval($ids[$i]),
                "name" => $names[$i],
                "amount" => intval($amounts[$i])
            ];
        }
        $formatted_data[] = $formatted_item;
    }
    return $formatted_data;
}