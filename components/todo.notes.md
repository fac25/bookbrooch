// - [ ] Add a select dropdown menu only on save Quote component
// - [ ] Pass an argument to Quote. If user is trying to save a quote, show them a dropdown menu
{
    <>
        <FormLabel htmlFor="tagToChoseFrom">Tag</FormLabel>
        <Select
            id="tagToChoseFrom"
            name="tagToChoseFrom"
            {...register("tagToChoseFrom", {
                required: "Tag is required",
            })}
        >
            <option value="Inspirational">Inspirational</option>
            <option value="Happiness">Happiness</option>
            <option value="Wisdom">Wisdom</option>
            <option value="Funny">Funny</option>
            <option value="Career/professional">Career/professional</option>
        </Select>
    </>
}


---


    { searchResults && (<>
        <Select
            id="tagToChoseFrom"
            name="tagToChoseFrom"
            {...register("tagToChoseFrom", {
                required: "Tag is required",
            })}
        >
            <option value="Inspirational">Inspirational</option>
            <option value="Happiness">Happiness</option>
            <option value="Wisdom">Wisdom</option>
            <option value="Funny">Funny</option>
            <option value="Career/professional">Career/professional</option>
        </Select>
    </>)}