#!/usr/bin/perl

use strict;
use warnings;

local $/ = undef;

my @files = @ARGV;

if ($ARGV[0] eq '-z') {
  open my $fh, '<', $ARGV[1];
  my $files = <$fh>;
  close $fh;

  @files = split /\n/, $files;
}

foreach my $file (@files) {
  open my $fh, '<', $file or next;
  my $widget = <$fh>;
  close $fh;

  next unless length $widget;

  $widget =~ s/define\((?:'\w+'\s*,\s*)?\[(.+?)\]\s*,\s*function\s*\((?:.*?)\)/rewrite($1)/es;

  $widget =~ s/\$.KBWidget/return KBWidget/g;

  #change constructor invocation
  $widget =~ s/^((?:[^\n=]+=)?)([^\S\n]*)(.+)\.(kbase\w+)\s*\(\s*{/$1$2 new $4($3, {/gm;

  #change empty invocation. Yes, yes, it's lazy.
  $widget =~ s/^((?:[^=\n]+=)?)([^\S\n]*)(.+)\.(kbase\w+)\s*\(\s*\)/$1$2 new $4($3)/gm;

  $widget =~ s/parent\s*:\s*(['"])(\w+)\1/parent : $2/g;

  open my $wfh, '>', $file;
  print $wfh $widget;
  close $wfh;
}


sub rewrite {
  my $def = shift;

  $def =~ s/['"]//g;
  $def =~ s/^\s+|\s+$//g;
  my @def = grep {/^\w+$/} split /\s*,\s*/, $def;

  unshift(@def, 'kbwidget', 'bootstrap');

  my %seen = ();
  @def = grep { ! $seen{$_} } @def;

  return "define (\n\t[\n" . join(",\n", map{"\t\t'$_'"} @def) . "\n\t], function(\n"
    . join(",\n", map {stupidRewriteRule($_)} @def) . "\n\t)";

}

sub stupidRewriteRule {
  my $module = shift;
  if ($module =~ /kbwidget/i) {
    $module = 'KBWidget';
  }
  if ($module =~ /jquery/i) {
    $module = '$';
  }
  return "\t\t" . $module;
}
