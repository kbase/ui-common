var metaToolInfo = {

    getPODescriptions : function() {
        return {
            label      : 'Get PO Descriptions',
            inputType  : [],
            outputType : ['*'],
            returnArrayStructure : ['ids'],

            fields : [
                {
                    name    : 'ids',
                    key     : 'ids',
                    label   : 'IDs',
                    type    : 'text',
                    split   : ' ',
                },
            ],
        }
    },

    networkType2Datasets : function() {
        return {
            label      : 'Network Type to Datasets',
            inputType  : [],
            outputType : ['*'],
            returnArrayStructure : ['networkTypes'],

            fields : [
                {
                    name    : 'networkTypes',
                    key     : 'networkTypes',
                    label   : 'Network Type',
                    type    : 'text',
                },
            ],
        }
    },

    datasetSource2Datasets : function() {
        return {
            label      : 'Dataset Source to Datasets',
            inputType  : [],
            outputType : ['datasets'],
            returnArrayStructure : ['datasetSource'],

            fields : [
                {
                    name    : 'datasetSource',
                    key     : 'datasetSource',
                    label   : 'Dataset Source',
                    type    : 'text',
                    //json    : 1,
                    //asArray : 1,
                },
            ],
        }
    },

    get_all_experiments : function() {
        return {
            label      : 'Get all experiments',
            inputType  : [],
            outputType : ['experiments'],
            returnArrayStructure : ['kb_genome'],

            fields : [
                {
                    name    : 'kb_genome',
                    key     : 'kb_genome',
                    label   : 'KBase Genome',
                    type    : 'text',
                },
            ],
        }
    },
    traits_to_variations : function() {
        return {
            label      : 'Traits to Variations',
            inputType  : [],
            outputType : ['*'],
            returnArrayStructure : ['traits'],

            fields : [
                {
                    name    : 'traits',
                    key     : 'traits',
                    label   : 'Trait',
                    type    : 'text',
                },
            ],
        }
    },
    chromosome_position_from_variation_details : function() {
        return {
            label      : 'Chromosome position from Variation Details',
            inputType  : [],
            outputType : ['*'],
            returnArrayStructure : ['variation_details'],

            fields : [
                {
                    name    : 'variation_details',
                    key     : 'variation_details',
                    label   : 'Variation Details',
                    type    : 'text',
                },
            ],
        }
    },
    variations_to_genes : function() {
        return {
            label      : 'Variations to Genes',
            inputType  : [],
            outputType : ['*'],
            returnArrayStructure : ['variations_to_genes'],

            fields : [
                {
                    name    : 'variations_to_genes',
                    key     : 'variations_to_genes',
                    label   : 'Variations to Genes',
                    type    : 'text',
                },
            ],
        }
    },
    find_common_snps : function() {
        return {
            label      : 'Find common SNPs',
            inputType  : [],
            outputType : ['*'],
            returnArrayStructure : ['snps'],

            fields : [
                {
                    name    : 'snps',
                    key     : 'snps',
                    label   : 'SNPs',
                    type    : 'text',
                },
            ],
        }
    },
    traits_to_genes : function() {
        return {
            label      : 'Traits to Genes',
            inputType  : [],
            outputType : ['*'],
            returnArrayStructure : ['traits', 'pvaluecutoff', 'distance'],

            fields : [
                {
                    name    : 'traits',
                    key     : 'traits',
                    label   : 'Trait',
                    type    : 'text',
                },
                {
                    name    : 'pvaluecutoff',
                    key     : 'pvaluecutoff',
                    label   : 'P Value Cutoff',
                    type    : 'text',
                },
                {
                    name    : 'distance',
                    key     : 'distance',
                    label   : 'Distance',
                    type    : 'text',
                },
            ],
        }
    },



    genomes_to_contigs : function() {
        return {
            label      : 'Convert Genomes to Contigs',
            inputType  : ['genomes'],
            outputType : ['contigs'],

            fields : [
                {
                    name    : 'column',
                    key     : '-c',
                    label   : 'Subsystem column',
                    type    : 'text',
                },
            ],
        }
    },
    contigs_to_sequences : function() {
        return {
            label      : 'Convert Contigs to Sequences',
            inputType  : ['contigs'],
            outputType : ['sequences'],

            fields : [
                {
                    name    : 'column',
                    key     : '-c',
                    label   : 'Subsystem column',
                    type    : 'text',
                },
            ],
        }
    },
    genomeTO_to_feature_data : function() {
        return {
            label      : 'Convert GenomeTO to Feature Data',
            inputType  : ['genome'],
            outputType : ['features'],

            fields : [
                {
                    name    : 'column',
                    key     : '-c',
                    label   : 'Subsystem column',
                    type    : 'text',
                },
            ],
        }
    },
    annotate_genome : function() {
        return {
            label      : 'Run Genome Annotation',
            inputType  : ['genome'],
            outputType : ['genome'],

            fields : [],
        }
    },
    fasta_to_genome : function() {
        return {
            label      : 'Convert FASTA to Genome',
            inputType  : ['fasta'],
            outputType : ['genome'],

            fields : [
                {
                    name    : 'args',
                    key     : 'args',
                    label   : 'Args',
                    type    : 'text',
                    valOnly : 1,
                },
                {
                    name    : 'source-id',
                    key     : '-source-id',
                    label   : 'Source ID',
                    type    : 'text',
                },
                {
                    name    : 'input',
                    key     : '-input',
                    label   : 'Input',
                    type    : 'text',
                },
                {
                    name    : 'Output',
                    key     : '-output',
                    label   : 'Output',
                    type    : 'text',
                },
            ],
        }
    },
};

{
    var all_entities = [
        'all_entities_Alignment',
        'all_entities_AlignmentAttribute',
        'all_entities_AlignmentRow',
        'all_entities_AlignmentTree',
        'all_entities_AlleleFrequency',
        'all_entities_Annotation',
        'all_entities_Assay',
        'all_entities_AtomicRegulon',
        'all_entities_Attribute',
        'all_entities_Biomass',
        'all_entities_BiomassCompound',
        'all_entities_CodonUsage',
        'all_entities_Compartment',
        'all_entities_Complex',
        'all_entities_Compound',
        'all_entities_CompoundInstance',
        'all_entities_Contig',
        'all_entities_ContigChunk',
        'all_entities_ContigSequence',
        'all_entities_CoregulatedSet',
        'all_entities_Diagram',
        'all_entities_EcNumber',
        'all_entities_Environment',
        'all_entities_Experiment',
        'all_entities_ExperimentalUnit',
        'all_entities_Family',
        'all_entities_Feature',
        'all_entities_Genome',
        'all_entities_Identifier',
        'all_entities_Locality',
        'all_entities_LocalizedCompound',
        'all_entities_Location',
        'all_entities_LocationInstance',
        'all_entities_Measurement',
        'all_entities_Media',
        'all_entities_Model',
        'all_entities_ModelCompartment',
        'all_entities_OTU',
        'all_entities_ObservationalUnit',
        'all_entities_PairSet',
        'all_entities_Pairing',
        'all_entities_Person',
        'all_entities_PhenotypeDescription',
        'all_entities_PhenotypeExperiment',
        'all_entities_ProbeSet',
        'all_entities_ProteinSequence',
        'all_entities_Protocol',
        'all_entities_Publication',
        'all_entities_Reaction',
        'all_entities_ReactionInstance',
        'all_entities_ReactionRule',
        'all_entities_Reagent',
        'all_entities_Requirement',
        'all_entities_Role',
        'all_entities_SSCell',
        'all_entities_SSRow',
        'all_entities_Scenario',
        'all_entities_Source',
        'all_entities_Strain',
        'all_entities_StudyExperiment',
        'all_entities_Subsystem',
        'all_entities_SubsystemClass',
        'all_entities_TaxonomicGrouping',
        'all_entities_Trait',
        'all_entities_Tree',
        'all_entities_TreeAttribute',
        'all_entities_TreeNodeAttribute',
        'all_entities_Variant',
        'all_entities_Variation'
    ];


    function add_all_entity_MetaInfo(tool) {

        var outputType = 'tab';
        var m;

        if (m = tool.match(/_([^_]+)$/)) {
            var plural = m[1] + 's';
            outputType = plural.toLowerCase();
        }

        var label = 'Load all ' + outputType;

        return {
            label      : label,
            inputType  : [],
            outputType : [outputType],

            fields : [
                {
                    name    : 'all_fields',
                    key     : '-a',
                    label   : 'All Fields',
                    type    : 'checkbox',
                },
                {
                    name    : 'show_fields',
                    key     : '--show-fields',
                    label   : 'Show Fields',
                    type    : 'checkbox',
                },
                {
                    name    : 'fields',
                    key     : '--fields',
                    label   : 'Specify fields',
                    type    : 'text',
                },
            ],
        }
    }

    for (var i = 0; i < all_entities.length; i++) {
        metaToolInfo[all_entities[i]] = add_all_entity_MetaInfo;
    }

    var all_get_relationships = [

        'get_relationship_AffectsLevelOf',
        'get_relationship_Aligned',
        'get_relationship_Aligns',
        'get_relationship_Annotates',
        'get_relationship_AreCodonsFor',
        'get_relationship_Asserts',
        'get_relationship_AssertsFunctionFor',
        'get_relationship_BelongsTo',
        'get_relationship_ComponentOf',
        'get_relationship_Comprises',
        'get_relationship_Concerns',
        'get_relationship_ConsistsOfCompounds',
        'get_relationship_Contains',
        'get_relationship_ContainsAlignedDNA',
        'get_relationship_ContainsAlignedProtein',
        'get_relationship_Controls',
        'get_relationship_DefinedBy',
        'get_relationship_DerivedFromGenome',
        'get_relationship_DerivedFromStrain',
        'get_relationship_Describes',
        'get_relationship_DescribesAlignment',
        'get_relationship_DescribesTree',
        'get_relationship_DescribesTreeNode',
        'get_relationship_Determines',
        'get_relationship_DeterminesFunctionOf',
        'get_relationship_Displays',
        'get_relationship_Encompasses',
        'get_relationship_ExperimentPublishedIn',
        'get_relationship_Formulated',
        'get_relationship_GeneratedLevelsFor',
        'get_relationship_GenomeParentOf',
        'get_relationship_HadResultsProducedBy',
        'get_relationship_HasAlignmentAttribute',
        'get_relationship_HasAsExemplar',
        'get_relationship_HasAsSequence',
        'get_relationship_HasAsTerminus',
        'get_relationship_HasAssertedFunctionFrom',
        'get_relationship_HasAssertionFrom',
        'get_relationship_HasAssociatedMeasurement',
        'get_relationship_HasCompoundAliasFrom',
        'get_relationship_HasCoregulationWith',
        'get_relationship_HasDefaultLocation',
        'get_relationship_HasEnvironment',
        'get_relationship_HasExperimentalUnit',
        'get_relationship_HasFunctional',
        'get_relationship_HasIndicatedSignalFrom',
        'get_relationship_HasKnockoutIn',
        'get_relationship_HasLevelsFrom',
        'get_relationship_HasMeasurement',
        'get_relationship_HasMember',
        'get_relationship_HasNodeAttribute',
        'get_relationship_HasParticipant',
        'get_relationship_HasPresenceOf',
        'get_relationship_HasProposedLocationIn',
        'get_relationship_HasProteinMember',
        'get_relationship_HasReactionAliasFrom',
        'get_relationship_HasRealLocationIn',
        'get_relationship_HasRepresentativeOf',
        'get_relationship_HasRequirementOf',
        'get_relationship_HasResultsFor',
        'get_relationship_HasResultsIn',
        'get_relationship_HasRole',
        'get_relationship_HasSection',
        'get_relationship_HasStep',
        'get_relationship_HasTrait',
        'get_relationship_HasTreeAttribute',
        'get_relationship_HasUnits',
        'get_relationship_HasUsage',
        'get_relationship_HasValueFor',
        'get_relationship_HasValueIn',
        'get_relationship_HasVariant',
        'get_relationship_HasVariation',
        'get_relationship_HasVariationIn',
        'get_relationship_Impacts',
        'get_relationship_Implements',
        'get_relationship_Imported',
        'get_relationship_IncludedIn',
        'get_relationship_Includes',
        'get_relationship_IncludesAdditionalCompounds',
        'get_relationship_IncludesAlignmentRow',
        'get_relationship_IncludesPart',
        'get_relationship_IncludesPartOf',
        'get_relationship_IncludesStrain',
        'get_relationship_IndicatedLevelsFor',
        'get_relationship_IndicatesSignalFor',
        'get_relationship_Involves',
        'get_relationship_IsARequirementIn',
        'get_relationship_IsARequirementOf',
        'get_relationship_IsATopicOf',
        'get_relationship_IsAffectedIn',
        'get_relationship_IsAlignedBy',
        'get_relationship_IsAlignedDNAComponentOf',
        'get_relationship_IsAlignedIn',
        'get_relationship_IsAlignedProteinComponentOf',
        'get_relationship_IsAlignmentFor',
        'get_relationship_IsAlignmentRowIn',
        'get_relationship_IsAnnotatedBy',
        'get_relationship_IsAssayOf',
        'get_relationship_IsAssayedBy',
        'get_relationship_IsBindingSiteFor',
        'get_relationship_IsBoundBy',
        'get_relationship_IsBuiltFromAlignment',
        'get_relationship_IsClassFor',
        'get_relationship_IsCollectedInto',
        'get_relationship_IsCollectionOf',
        'get_relationship_IsComponentOf',
        'get_relationship_IsComposedOf',
        'get_relationship_IsComprisedOf',
        'get_relationship_IsConfiguredBy',
        'get_relationship_IsConsistentTo',
        'get_relationship_IsConsistentWith',
        'get_relationship_IsContainedIn',
        'get_relationship_IsControlledUsing',
        'get_relationship_IsCoregulatedWith',
        'get_relationship_IsCoupledTo',
        'get_relationship_IsCoupledWith',
        'get_relationship_IsDefaultFor',
        'get_relationship_IsDefaultLocationOf',
        'get_relationship_IsDescribedBy',
        'get_relationship_IsDeterminedBy',
        'get_relationship_IsDisplayedOn',
        'get_relationship_IsDividedInto',
        'get_relationship_IsDivisionOf',
        'get_relationship_IsEncompassedIn',
        'get_relationship_IsExecutedAs',
        'get_relationship_IsExecutionOf',
        'get_relationship_IsExemplarOf',
        'get_relationship_IsExperimentalUnitOf',
        'get_relationship_IsFamilyFor',
        'get_relationship_IsFormedInto',
        'get_relationship_IsFormedOf',
        'get_relationship_IsFunctionalIn',
        'get_relationship_IsGroupFor',
        'get_relationship_IsImpactedBy',
        'get_relationship_IsImplementedBy',
        'get_relationship_IsInClass',
        'get_relationship_IsInGroup',
        'get_relationship_IsInPair',
        'get_relationship_IsInTaxa',
        'get_relationship_IsIncludedIn',
        'get_relationship_IsInstanceOf',
        'get_relationship_IsInstantiatedBy',
        'get_relationship_IsInvolvedIn',
        'get_relationship_IsLocated',
        'get_relationship_IsLocatedIn',
        'get_relationship_IsLocatedOn',
        'get_relationship_IsLocusFor',
        'get_relationship_IsManagedBy',
        'get_relationship_IsMeasureOf',
        'get_relationship_IsMeasurementMethodOf',
        'get_relationship_IsMemberOf',
        'get_relationship_IsModeledBy',
        'get_relationship_IsModificationOfAlignment',
        'get_relationship_IsModificationOfTree',
        'get_relationship_IsModifiedToBuildAlignment',
        'get_relationship_IsModifiedToBuildTree',
        'get_relationship_IsNamedBy',
        'get_relationship_IsOwnedBy',
        'get_relationship_IsOwnerOf',
        'get_relationship_IsPairOf',
        'get_relationship_IsPartOf',
        'get_relationship_IsParticipatingAt',
        'get_relationship_IsParticipationOf',
        'get_relationship_IsPresentIn',
        'get_relationship_IsProjectedOnto',
        'get_relationship_IsProposedLocationOf',
        'get_relationship_IsProteinFor',
        'get_relationship_IsProteinMemberOf',
        'get_relationship_IsReagentIn',
        'get_relationship_IsRealLocationOf',
        'get_relationship_IsReferencedBy',
        'get_relationship_IsRegulatedIn',
        'get_relationship_IsRegulatedSetOf',
        'get_relationship_IsRelevantFor',
        'get_relationship_IsRelevantTo',
        'get_relationship_IsRepresentedBy',
        'get_relationship_IsRepresentedIn',
        'get_relationship_IsRequiredBy',
        'get_relationship_IsRoleFor',
        'get_relationship_IsRoleOf',
        'get_relationship_IsRowOf',
        'get_relationship_IsSectionOf',
        'get_relationship_IsSequenceOf',
        'get_relationship_IsShownOn',
        'get_relationship_IsStepOf',
        'get_relationship_IsSubInstanceOf',
        'get_relationship_IsSubclassOf',
        'get_relationship_IsSummarizedBy',
        'get_relationship_IsSuperclassOf',
        'get_relationship_IsSupersededByAlignment',
        'get_relationship_IsSupersededByTree',
        'get_relationship_IsTargetOf',
        'get_relationship_IsTaxonomyOf',
        'get_relationship_IsTerminusFor',
        'get_relationship_IsTreeFrom',
        'get_relationship_IsTriggeredBy',
        'get_relationship_IsUsageOf',
        'get_relationship_IsUseOf',
        'get_relationship_IsUsedAs',
        'get_relationship_IsUsedBy',
        'get_relationship_IsUsedToBuildTree',
        'get_relationship_IsUtilizedIn',
        'get_relationship_IsVariantOf',
        'get_relationship_IsVariedIn',
        'get_relationship_KnockedOutIn',
        'get_relationship_Manages',
        'get_relationship_Measures',
        'get_relationship_MeasuresPhenotype',
        'get_relationship_Models',
        'get_relationship_Names',
        'get_relationship_OperatesIn',
        'get_relationship_Overlaps',
        'get_relationship_ParticipatesAs',
        'get_relationship_ParticipatesAt',
        'get_relationship_ParticipatesIn',
        'get_relationship_PerformedBy',
        'get_relationship_PerformedExperiment',
        'get_relationship_ProducedResultsFor',
        'get_relationship_Produces',
        'get_relationship_ProjectsOnto',
        'get_relationship_ProtocolPublishedIn',
        'get_relationship_Provided',
        'get_relationship_PublishedExperiment',
        'get_relationship_PublishedProtocol',
        'get_relationship_ReflectsStateOf',
        'get_relationship_Requires',
        'get_relationship_ResultsIn',
        'get_relationship_RunsByDefaultIn',
        'get_relationship_Shows',
        'get_relationship_StrainParentOf',
        'get_relationship_Submitted',
        'get_relationship_SummarizedBy',
        'get_relationship_Summarizes',
        'get_relationship_SupersedesAlignment',
        'get_relationship_SupersedesTree',
        'get_relationship_Targets',
        'get_relationship_Treed',
        'get_relationship_Triggers',
        'get_relationship_UsedBy',
        'get_relationship_UsedInExperimentalUnit',
        'get_relationship_Uses',
        'get_relationship_UsesAliasForCompound',
        'get_relationship_UsesAliasForReaction',
        'get_relationship_UsesCodons',
        'get_relationship_UsesMedia',
        'get_relationship_UsesReference',
        'get_relationship_Validates',
        'get_relationship_WasAlignedBy',
        'get_relationship_WasDetermiedBy',
        'get_relationship_WasFormulatedBy',
        'get_relationship_WasGeneratedFrom',
        'get_relationship_WasImportedFrom',
        'get_relationship_WasMeasuredBy',
        'get_relationship_WasProvidedBy',
        'get_relationship_WasSubmittedBy',
    ];

    function add_get_relationship_MetaInfo() {
        return {
            inputType  : ['txt'],
            outputType : ['tab'],

            fields : [
                {
                    name    : 'column',
                    key     : '-c',
                    label   : 'Column',
                    type    : 'text',
                },
                {
                    name    : 'from',
                    key     : '-from',
                    label   : 'From Field list',
                    type    : 'text',
                },
                {
                    name    : 'rel',
                    key     : '-rel',
                    label   : 'Specify relationship fields',
                    type    : 'text',
                },
                {
                    name    : 'to',
                    key     : '-to',
                    label   : 'Choose a set of fields from the given entity to return',
                    type    : 'text',
                },
            ],
        }
    }

    for (var i = 0; i < all_get_relationships.length; i++) {
        metaToolInfo[all_get_relationships[i]] = add_get_relationship_MetaInfo;
    }

    var all_get_entities = [
        'get_entity_Alignment',
        'get_entity_AlignmentAttribute',
        'get_entity_AlignmentRow',
        'get_entity_AlignmentTree',
        'get_entity_AlleleFrequency',
        'get_entity_Annotation',
        'get_entity_Assay',
        'get_entity_AtomicRegulon',
        'get_entity_Attribute',
        'get_entity_Biomass',
        'get_entity_BiomassCompound',
        'get_entity_CodonUsage',
        'get_entity_Compartment',
        'get_entity_Complex',
        'get_entity_Compound',
        'get_entity_CompoundInstance',
        'get_entity_Contig',
        'get_entity_ContigChunk',
        'get_entity_ContigSequence',
        'get_entity_CoregulatedSet',
        'get_entity_Diagram',
        'get_entity_EcNumber',
        'get_entity_Environment',
        'get_entity_Experiment',
        'get_entity_ExperimentalUnit',
        'get_entity_Family',
        'get_entity_Feature',
        'get_entity_Genome',
        'get_entity_Identifier',
        'get_entity_Locality',
        'get_entity_LocalizedCompound',
        'get_entity_Location',
        'get_entity_LocationInstance',
        'get_entity_Measurement',
        'get_entity_Media',
        'get_entity_Model',
        'get_entity_ModelCompartment',
        'get_entity_OTU',
        'get_entity_ObservationalUnit',
        'get_entity_PairSet',
        'get_entity_Pairing',
        'get_entity_Person',
        'get_entity_PhenotypeDescription',
        'get_entity_PhenotypeExperiment',
        'get_entity_ProbeSet',
        'get_entity_ProteinSequence',
        'get_entity_Protocol',
        'get_entity_Publication',
        'get_entity_Reaction',
        'get_entity_ReactionInstance',
        'get_entity_ReactionRule',
        'get_entity_Reagent',
        'get_entity_Requirement',
        'get_entity_Role',
        'get_entity_SSCell',
        'get_entity_SSRow',
        'get_entity_Scenario',
        'get_entity_Source',
        'get_entity_Strain',
        'get_entity_StudyExperiment',
        'get_entity_Subsystem',
        'get_entity_SubsystemClass',
        'get_entity_TaxonomicGrouping',
        'get_entity_Trait',
        'get_entity_Tree',
        'get_entity_TreeAttribute',
        'get_entity_TreeNodeAttribute',
        'get_entity_Variant',
        'get_entity_Variation',
    ];

    function add_get_entity_MetaInfo() {
        return {
            inputType  : ['txt'],
            outputType : ['tab'],

            fields : [
                {
                    name    : 'all_fields',
                    key     : '-a',
                    label   : 'All fields',
                    type    : 'checkbox',
                },
                {
                    name    : 'column',
                    key     : '-c',
                    label   : 'Column',
                    type    : 'text',
                },
                {
                    name    : 'help',
                    key     : '-h',
                    label   : 'Display help',
                    type    : 'checkbox',
                },
                {
                    name    : 'fields',
                    key     : '-fields',
                    label   : 'Choose a set of fields to return, comma separated',
                    type    : 'text',
                },
            ],
        }
    }

    for (var i = 0; i < all_get_entities.length; i++) {
        metaToolInfo[all_get_entities[i]] = add_get_entity_MetaInfo;
    }

}

function MetaToolInfo (name) {
    if (name == undefined) {
        return metaToolInfo;
    }
    else {
        return metaToolInfo[name];
    }
};
